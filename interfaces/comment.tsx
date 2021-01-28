import { ObjectID } from 'mongodb'

export default interface Comment {
    _id: ObjectID;
    author: ObjectID; 
    text: string;
    response: null | ObjectID[];
    nodeName: string;
    likes: number;
    dislikes: number;
}