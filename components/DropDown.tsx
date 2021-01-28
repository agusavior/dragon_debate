import Link from "next/link";
import useSession from "../hooks/useSession";

const DropDown = (props) => {
    const { user, logOut } = useSession()

    if (user === null)
        return <div/>

    return <div className='dropdown'>
        <br/>
        <li><img src={user.avatarUrl} alt="Avatar" className="avatar"/></li>
        <br/>
        <li><Link href='/config'><a>Configuración</a></Link></li>
        <li><div onClick={logOut}><a href='/login'>Cerrar sesión</a></div></li>

        <style jsx>{`
        .avatar {
            vertical-align: middle;
            width: 64px;
            height: 64px;
            border-radius: 50%;
        }

        .dropdown {
            display: none;
            flex-direction: column;
            position: absolute;
            color: white;
            background-color: green;
            right: 0px;
            z-index: 1;
        }
        `}</style>

        <style jsx global>{`
        .dropdown-trigger {
            position: relative;
            display: inline-block;
        }

        .dropdown-trigger:hover .dropdown {
            display: flex;
        }
        `}</style>    
    </div>
}

export default DropDown;