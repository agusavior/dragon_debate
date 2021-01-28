import PageLayout from '../components/PageLayout'
import HeadOG from '../components/headers/HeadOG'

import { useState, useContext } from 'react'
import useSession from '../hooks/useSession';

import customFetch, { FILE_FIELD } from '../utils/customFetch'
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import Video from '../interfaces/video';
import { postFile } from '../utils/customAxios'

const Index = () => {
    const { register, handleSubmit } = useForm();
    const { user } = useSession();
    const [serverErrorMessage, setServerErrorMessage] = useState('')

    const onSubmit = async data => {
        try {
            const { video } = await postFile('/api/private/uploadVideo', data[FILE_FIELD][0])

            if (video !== undefined) {
                Router.push(`/video/${video._id}`)
            } else throw { message: 'Undefined video.' }
        } catch(err) {
            setServerErrorMessage(err.message)
        }
    };

    return  <form onSubmit={handleSubmit(onSubmit)}>
    <label>Video:</label>
    <input
        name={FILE_FIELD}
        type="file"
        ref={register}
    />

    <label>Título del vídeo:</label>
    <input
        name="videoTitle"
        defaultValue="-"
        ref={register}
    />
    {(serverErrorMessage !== '') && <p>{serverErrorMessage}</p> }
    <input type="submit" value="Subir" />

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

export default () => <PageLayout>
    <HeadOG title={'0000000000000000'} description={''} imageURL={''}/>
    <Index/>
</PageLayout>