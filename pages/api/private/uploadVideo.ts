import formidable from 'formidable';
import withDatabase from '../../../middlewares/withDatabase';
import { NextApiResponse } from 'next';
import authentication, { AuthApiRequest } from '../../../middlewares/authentication';
import Video from '../../../interfaces/video';
import { ObjectID, Collection } from 'mongodb';
import { INSERT_ONE_OPTIONS, DISCORD_BOT_URL, CONTENT_URL } from '../../../constants';
import error from '../../../utils/apiError';
import { FILE_FIELD } from '../../../utils/customFetch';
import movToMp4 from '../../../utils/movToMp4';
import Axios from 'axios'
import { videoURL } from '../../../discordbot/router';

export const config = {
    api: {
        bodyParser: false,
    },
};

function fileNameOfFile(file) {
    return 'upload' + file.path.split('upload')[1]
}

async function createVideo(videosCollection: Collection<Video>, filename: string) {
    // Let's create a new Video element:
    let video: Video = {
        _id: new ObjectID(),
        name: '-',
        fileName: filename,
    }

    // Insert the video in the collection and return it
    await videosCollection.insertOne(video, INSERT_ONE_OPTIONS);
    return video;
}

async function publishVideo(video: Video) {
    await Axios.post(DISCORD_BOT_URL + '/publishVideo', {
        [videoURL]: `${CONTENT_URL}/${video.fileName}`
    })
}

const handler = async (req: AuthApiRequest, res: NextApiResponse) => {
    if (!req.user.isAdmin)
        return res.status(401).json({ message: 'You need to be admin.' });

    const form = new formidable.IncomingForm();
    form.uploadDir = "./content/";
    
    form.keepExtensions = true;
    form.parse(req, async (err, _, data) => {
        if (err)
            return error(res, err.message);
        let file = data[FILE_FIELD];
        if (file !== undefined) {
            let filename = fileNameOfFile(file);

            movToMp4(filename, async (filename) => {
                try {
                    let video = await createVideo(req.videos, filename);

                    await publishVideo(video);

                    return res.status(200).json({ message: 'Video created successfully.', video });
                } catch(err) {
                    return error(res, err.message);
                }
            })
        } else {
            return error(res, 'Undefined file');
        }
    });
}

export default withDatabase(authentication(handler));
