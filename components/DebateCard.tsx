import React, { ReactElement } from 'react'
import Link from 'next/link'
import Debate from '../interfaces/debate'

interface Props {
    debate: Debate;
}

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f1f3f4',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    marginBottom: '40px',
}

const DebateCard = ({ debate }: Props): ReactElement => (
    <Link href={`/debate/${debate.name}`}><a>
        <div className='DebateCard' style={style}>
            <h2>{debate.title}</h2>
            <h4>{debate.description}</h4>
        </div>


    <style jsx>{`

        Link:hover {
            color: rgb(114, 116, 21);
        }

        a:hover {
            color: red;
        }
        
    `}</style>

    </a></Link>
)

export default DebateCard;
