import { NextApiResponse } from 'next'
import withDatabase, { DbApiRequest } from '../../middlewares/withDatabase'


function error(res: NextApiResponse, message: string) {
  return res.status(401).json({ message })
}

const handler = (req: DbApiRequest, res: NextApiResponse) => {
    console.log('cookies', req.cookies)
    res.status(200).json({ name: 'John Doe 2' })
}

export default withDatabase(handler);