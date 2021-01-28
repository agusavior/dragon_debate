import { NextApiResponse } from 'next'
import withDatabase, { DbApiRequest } from '../../../../middlewares/withDatabase'
import Video from '../../../../interfaces/video'
import { ObjectId } from 'mongodb';
import error from '../../../../utils/apiError';
import User from '../../../../interfaces/user';

const handler = async (req: DbApiRequest, res: NextApiResponse) => {
    let id = req.query.id as string;
    
    let user = await req.users.findOne<User>({_id: new ObjectId(id)})

    if (user)
        return res.status(200).json({ message: 'Successfully.', user })
    return error(res, 'No user matches with this ID.')
}

export default withDatabase(handler);