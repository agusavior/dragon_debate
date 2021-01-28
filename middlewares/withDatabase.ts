import { MongoClient, Db, Collection } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import User from '../interfaces/user'
import Video from '../interfaces/video';
import Comment from '../interfaces/comment'

import catchInternalError from './catchInternalError';
import { MONGO_URI, DB_NAME } from '../constants';

export interface DbApiRequest extends NextApiRequest {
    db: Db;
    users: Collection<User>;
    videos: Collection<Video>;
    comments: Collection<Comment>;
}

// Connect to the DataBase
const uri = MONGO_URI;
const client: MongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Firts connect configuration:
client.connect().then(() => {
    console.log('First mongo connection. Now configuring...')

    // Do unique the "username" field of users
    client.db(DB_NAME).collection('users').createIndex({username: 1}, {unique: true})
    .then(s => console.log('Configuration Ok. Unique key username in users.'))
    .catch(err => console.log('Configuration Fail:', err))
})

// This function takes a NextApiRequest and return a
// DbApiRequest, filling all of their missing arguments
function fillRequest(req: NextApiRequest, client: MongoClient): DbApiRequest {
    let reqDb = req as DbApiRequest;
    let db = client.db(DB_NAME);
    reqDb.db = db;

    // Fill the request with the collections
    reqDb.users = db.collection('users');
    reqDb.videos = db.collection('videos');
    reqDb.comments = db.collection('comments');

    return reqDb;
}

const withDatabase = handler => (req: NextApiRequest, res: NextApiResponse) => {
    if (!client.isConnected()) {
        return client.connect().then(() => {
            // Log:
            console.log('Mongo has been disconnected, now is connected!')

            return catchInternalError(handler)(fillRequest(req, client), res)
        }).catch(err => res.status(500).json({message: 'Internal DataBase Connection Error.'}));
    }
    return catchInternalError(handler)(fillRequest(req, client), res)
};

export default withDatabase;