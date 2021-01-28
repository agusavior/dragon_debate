import { NextApiResponse } from 'next'
import withDatabase, { DbApiRequest } from '../../middlewares/withDatabase'

import assert from 'assert'

const handler = (req: DbApiRequest, res: NextApiResponse) => {
    res.setHeader('A', 'B')
    /*
    console.log('test reqest')
    // Insert a single document
    let r = req.db.collection('inserts').find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log('len', docs.length)
      console.log('docs[0]', docs[0])
    });*/

    res.status(200).json({ message: 'Bien' })
}

export default withDatabase(handler);