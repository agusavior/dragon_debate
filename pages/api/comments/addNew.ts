import { NextApiResponse } from 'next'
import Comment from '../../../interfaces/comment'
import { ObjectID } from 'mongodb'
import authentication, { AuthApiRequest } from '../../../middlewares/authentication'
import error from '../../../utils/apiError'
import { INSERT_ONE_OPTIONS } from '../../../constants'
import withDatabase from '../../../middlewares/withDatabase'

const handler = async (req: AuthApiRequest, res: NextApiResponse) => {
    const { user, text, nodeName } = req.body

    if (user === null)
        return error(res, 'Debes iniciar sesión primero.')
    
    if (text === '')
        return error(res, 'Debes escribir algo antes de comentar.')

    // Let's create a new Comment element:
    let comment: Comment = {
        _id: new ObjectID(),
        author: user._id,
        text: text,
        likes: 0,
        dislikes: 0,
        response: null,
        nodeName,
    }

    await req.comments.insertOne(comment, INSERT_ONE_OPTIONS);

    return res.status(200).json({ message: 'Comment posted successfully.', comment });
}

export default withDatabase(authentication(handler));