import { NextApiResponse } from 'next'
import withDatabase, { DbApiRequest } from '../../middlewares/withDatabase'
import { sign } from '../../middlewares/authentication';
import User from '../../interfaces/user';
import TokenObject from '../../interfaces/tokenObject';
import error from '../../utils/apiError';

// TERMINARRRRR DECIR BIEN LOS ERRORES!

const handler = async (req: DbApiRequest, res: NextApiResponse) => {
    let body = req.body

    if (body.username === undefined)
    return error(res, 'Nombre de usuario vacío. Complete el campo.')

    if (body.username.length > 64)
        return error(res, 'Nombre de usuario muy largo.')

    if (body.password === undefined)
        return error(res, 'Contraseña requerida. Complete el campo.')
    
    if (body.password.length < 6)
        return error(res, 'La contraseña debe tener un mínimo de 6 caracteres.')

    if (body.password.length > 128)
        return error(res, 'La contraseña debe tener un máximo de 128 caracteres.')

    req.users.findOne({username: body.username})
    .then((user: User) => {
        if (user === null)
            return error(res, 'No existe el usuario. Primero debes registrarte.')
        else {
            // Comprueba si el password otorgado es correcto.
            if(user.password !== body.password) {
                return error(res, 'Contraseña Incorrecta.')
            }

            // Generamos el token, solo con el ID del usuario.
            let tokenObject: TokenObject = {
                user_id: user._id,
            }

            // Crea el token
            const token = sign(tokenObject); 

            return res.status(200).json({ message: 'Loggin successfully.', token, user })
        }
    }).catch(err => {
        return error(res, 'Other error: ' + err.message)
    })
}

export default withDatabase(handler);