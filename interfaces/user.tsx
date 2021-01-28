import { ObjectID } from 'mongodb'

export default interface User {
    _id: ObjectID
    username: string    // No modificable
    name: undefined | string        // Dinámico
    password: string    // No es un hash, es la contraseña cruda
    avatarUrl: undefined | string
    isAdmin: undefined | boolean;
}