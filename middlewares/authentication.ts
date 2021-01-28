import jwt from 'jsonwebtoken'
import { NextApiResponse } from 'next';
import { DbApiRequest } from './withDatabase';
import User from '../interfaces/user';
import assert from 'assert'
import { AUTH_EXPIRE_TIME, AUTH_SECRET_KEY } from '../constants'
import { ObjectId } from 'mongodb';
import TokenObject from '../interfaces/tokenObject';

export interface AuthApiRequest extends DbApiRequest {
    user: User
}

// Esta función firma el objeto 'objectToTokenize' y retorna el token (o firma).
export const sign = (objectToTokenize) => {
    const signOptions = { expiresIn: AUTH_EXPIRE_TIME };
    let token = jwt.sign( objectToTokenize, AUTH_SECRET_KEY, signOptions );
    /*console.log('jwt.verify(t...: ', jwt.verify(token, AUTH_SECRET_KEY));
    console.log('AUTH_SECRET_KEY', AUTH_SECRET_KEY)
    console.log('token', token)*/
    return token
}

// Este es un middleware utilizado para comprobar si el token
// recibido es válido. En caso de ser válido, llama a next().
const authentication = handler => (req: DbApiRequest, res: NextApiResponse) => {
    // Let's get the token.
    let token: string | undefined;

    const { cookies, body, headers } = req;

    if (cookies && cookies.token) {
        token = cookies.token;
    } else if (body && body.token) {
        token = body.token; 
    } else if (headers && headers.token && typeof(headers.token) === 'string') {
        token = headers.token;
    } else {
        token = undefined;
    }
    
    // Si no tiene autorización, termina.
    if(token === undefined) {
        return res.status(401).json({ message: 'Missing cookie token.' })
    }

    let user_id: ObjectId | undefined = undefined

    try {
        // Comprueba si la secret key es capaz de decodificar dicho token.
        // En caso de no conseguirlo, esta función largará un error, entrando en el catch.
        user_id = new ObjectId(jwt.verify(token, AUTH_SECRET_KEY).user_id);
    } catch(err) {
        return res.status(401).json({ message: 'Invalid token verification.' });
    }

    req.users.findOne<User>({_id: user_id})
    .then(user => {
        if (user === null) {
            return res.status(401).json({ message: 'User described inside token no longer exists.' });
        } else {
            let authReq: AuthApiRequest = req as AuthApiRequest;
            authReq.user = user;
            return handler(authReq, res);
        }
    })
};

export default authentication;