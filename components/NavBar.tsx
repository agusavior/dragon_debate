import Link from 'next/link'

import DropDown from './DropDown'
import useSession from '../hooks/useSession'
import { IS_DEV } from '../constants'

export default () => {
    const { user } = useSession()

    return <div className='nav-bar' >
            <ul>
                <li><Link href='/'><a>Inicio</a></Link></li>  
                <li><Link href='/debates'><a>Debates</a></Link></li>
                <li><Link href='/discord'><a>Discord</a></Link></li>
            </ul>
            <ul>
                { user && <div className='dropdown-trigger'>
                    <li><a>Sesión</a></li>
                    <DropDown /> 
                    </div>
                }
                { !user && <li><Link href='/login'><a>Iniciar Sesión</a></Link></li> }
                { /* SACAR EL 'false'! cuando termines de hacer el registro */ false && (
                    !user && <li><Link href='/singup'><a>Registrarse</a></Link></li>
                ) }
            </ul>

        <style jsx>{`
        .nav-bar {
            display:flex;
            flex-direction: row;
            justify-content: space-between;
            left: 0;
            top: 0;
            width: 100%;
            list-style-type: none;
            margin: 0;
            padding: 0;
            background-color: #333;
        }

        ul {
            display: flex;
            flex-direction: row;
            list-style-type: none;
            margin: 0;
            padding: 0;
        }
        `}</style>
    </div>
}