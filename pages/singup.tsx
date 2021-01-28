import fetch from 'unfetch'
import PageLayout from '../components/PageLayout'
import { FormEvent, useState } from 'react'
import { useForm } from "react-hook-form"
import Router from 'next/router'
import customFetch from '../utils/customFetch'

const Index = () => {
    const { register, handleSubmit } = useForm();
    const [serverErrorMessage, setServerErrorMessage] = useState('')
    //const { isHashing, hashThis } = useProofOfWork()

    const onSubmit = async data => {
        try {
            await customFetch('/api/singup', 'POST', data)
            Router.push('/login')
        } catch(err) {
            setServerErrorMessage(err.message)
        }    
    };

    return <form onSubmit={handleSubmit(onSubmit)}>
            <label>Nombre de usuario:</label>
            <input
                name="username"
                defaultValue=""
                ref={register}
            />
            <label>Contraseña:</label>
            <input
                name="password"
                type="password"
                ref={register}
            />
            <label>Confirme la contraseña:</label>
            <input
                name="passwordConfirm"
                type="password"
                ref={register}
            />
            {(serverErrorMessage !== '') && <p>{serverErrorMessage}</p> }
            <input type="submit" value="Registrarse" />

        <style jsx>{`
        input[type="submit"] {
            background: #ec5990;
            color: white;
            text-transform: uppercase;
            border: none;
            margin-top: 40px;
            padding: 20px;
            font-size: 16px;
            font-weight: 100;
            letter-spacing: 3px;
        }

        input[type="submit"]:hover {
            background: #bf1650;
        }

        form {
            max-width: 500px;
            margin: 0 auto;
        }

        h1 {
            font-weight: 100;
            color: white;
            text-align: center;
            padding-bottom: 10px;
            border-bottom: 1px solid rgb(79, 98, 148);
        }

        .form {
            background: #0e101c;
            max-width: 400px;
            margin: 0 auto;
        }

        p {
            color: #bf1650;
        }

        p::before {
            display: inline;
            content: "⚠ ";
        }

        input {
            background: #E8E8FA;
            display: block;
            box-sizing: border-box;
            width: 100%;
            border-radius: 4px;
            border: 1px solid white;
            padding: 10px 15px;
            margin-bottom: 10px;
            font-size: 14px;
        }

        label {
            line-height: 2;
            text-align: left;
            display: block;
            margin-bottom: 13px;
            margin-top: 20px;
            color: black;
            font-size: 14px;
            font-weight: 200;
        }

        `}</style>

        </form>
}

export default () => <PageLayout> <Index/> </PageLayout>

