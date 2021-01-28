import { useState, useContext } from 'react'
import useSession from '../../hooks/useSession';
import { post } from '../../utils/customAxios'
import { useRouter } from 'next/router';
import { API_URL } from '../../constants';

interface Props {
    nodeName: string;
}

export default ({ nodeName }: Props) => {
    const { user } = useSession();
    const [serverErrorMessage, setServerErrorMessage] = useState('')
    const [text, setText] = useState('')

    async function onSubmit() {
        const data = {
            text,
            user,
            nodeName,
        }

        try {
            await post(API_URL + '/comments/addNew', data);
        } catch(err) {
            setServerErrorMessage(err.message)
        }
    };

    if(!user)
        return <div>  <p> Registrate para comentar  </p> </div>

    return <div className='form'>
            <label>Contraseña:</label>
            <textarea rows={4} cols={50} value={text} onChange={(e) => setText(e.target.value)} />
            {(serverErrorMessage !== '') && <p>{serverErrorMessage}</p> }
            <button onClick={(e) => onSubmit()} > Publicar </button>
        <style jsx>{`
        `}</style>
    </div>
}