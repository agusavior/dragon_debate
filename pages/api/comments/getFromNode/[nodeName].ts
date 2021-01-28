import { NextApiResponse } from 'next'
import withDatabase, { DbApiRequest } from '../../../../middlewares/withDatabase'
import Comment from '../../../../interfaces/comment'
import error from '../../../../utils/apiError';

const handler = async (req: DbApiRequest, res: NextApiResponse) => {
    console.log('getFromNode/asasd')
    let nodeName = req.query.nodeName as string;
    
    let cursor = await req.comments.find<Comment>({ nodeName })

    // Ordenar por epoch
    // cursor.sort( {  } )

    cursor.limit( 50 );

    let comments = await cursor.toArray();

    console.log('comments', comments)

    if (comments)
        return res.status(200).json({ message: 'Successfully.', comments })
    return error(res, 'No comments matches with this node name.')
}

export default withDatabase(handler);