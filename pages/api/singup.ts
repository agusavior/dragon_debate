import { NextApiResponse } from 'next'
import withDatabase, { DbApiRequest } from '../../middlewares/withDatabase'
import User from '../../interfaces/user'
import { ObjectID } from 'mongodb'
import { INSERT_ONE_OPTIONS } from '../../constants'
import error from '../../utils/apiError'

const handler = (req: DbApiRequest, res: NextApiResponse) => {
    let body = req.body

    console.log('body ' + body.password)

    if (body.username === undefined)
        return error(res, 'Nombre de usuario requerido. Complete el campo.')

    if (body.username.length > 64)
        return error(res, 'Nombre de usuario muy largo.')

    if (body.password === undefined)
        return error(res, 'Contraseña requerida. Complete el campo.')

    if (body.password.length < 6)
        return error(res, 'La contraseña debe tener un mínimo de 6 caracteres.')

    if (body.password.length > 128)
        return error(res, 'La contraseña debe tener un máximo de 128 caracteres.')

    if (body.passwordConfirm !== body.password)
        return error(res, 'La confirmación de la contraseña es incorrecta.')

    req.users.findOne({username: body.username})
    .then((user: User) => {
        if (user !== null)
            error(res, 'Ya existe un usuario con dicho nombre de usuario.')
        else {
            // Generamos un usuario directamente con el body.
            const user: User = {
                _id: new ObjectID(),
                username: body.username,
                password: body.password,
                avatarUrl: body.avatarUrl,
                isAdmin: false,
                name: body.name
            };

            //'El nombre de usuario ya está en uso. Por favor, elija otro.'

            req.users.insertOne(user, INSERT_ONE_OPTIONS)
            .then(r => res.status(200).json({ message: 'User registered successfully.', user }))
            .catch(err => error(res, err.message));
        }
    })
}

export default withDatabase(handler);