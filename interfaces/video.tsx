import { ObjectID } from 'mongodb'

export default interface Video {
    _id: ObjectID
    fileName: string    // No modificable
    name: string        // Dinámico
}