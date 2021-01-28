import { ObjectID } from "mongodb";
import Video from "./video";

export default interface Node {
    _id: ObjectID;
    name: string;
    text: string;
    video: null | Video;
    description: string;
    audios: string[];
}