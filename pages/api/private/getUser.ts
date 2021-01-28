import { NextApiResponse } from 'next'
import withDatabase from '../../../middlewares/withDatabase'
import authentication, { AuthApiRequest } from '../../../middlewares/authentication'

const handler = (req: AuthApiRequest, res: NextApiResponse) => {
    res.status(200).json({ message: 'Successfully.', user: req.user })
}

export default withDatabase(authentication(handler));