import { NextApiResponse } from 'next'
import withDatabase, { DbApiRequest } from '../../../../middlewares/withDatabase'
import Video from '../../../../interfaces/video'
import { ObjectId } from 'mongodb';
import error from '../../../../utils/apiError';

const handler = async (req: DbApiRequest, res: NextApiResponse) => {
    let idOrName = req.query.idOrName as string; // Falta la parte de contemplar el nombre
    
    let video = await req.videos.findOne<Video>({_id: new ObjectId(idOrName)})
    
    if (!video)
        video =  await req.videos.findOne<Video>({name: idOrName})
    
    if (video)
        return res.status(200).json({ message: 'Successfully.', video })
    return error(res, 'No video matches with this ID.')
}

export default withDatabase(handler);