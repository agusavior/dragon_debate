// Este es el objeto json que se firma y se termina pasando al cliente

import { ObjectId } from "mongodb";

export default interface TokenObject {
    user_id: ObjectId;
}