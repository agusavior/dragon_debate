import PageLayout from '../../components/PageLayout'
import HeadOG from '../../components/headers/HeadOG'
import { useRouter } from 'next/router'
import customFetch from '../../utils/customFetch'
import Video from '../../interfaces/video'
import axios from 'axios'
import { get } from '../../utils/customAxios'
import { API_URL, APP_URL, CONTENT_URL } from '../../constants'
import HeadOGVideo from '../../components/headers/HeadOGVideo'
import copy from 'copy-to-clipboard';
import CopyIcon from '../../components/svg/CopyIcon'
import { useState } from 'react'

interface Props {
    video: Video;
}

const Index = ({ video }: Props) => {
    const router = useRouter()
    const [copied, setCopied] = useState(false)
    
    function onClick() {
        copy(`${APP_URL}${router.asPath} ${CONTENT_URL}/${video.fileName}`);
        setCopied(true);
    }

    return <div id='page'>
        <h2>{ (video.name !== '-') && video.name }</h2>

        <button onClick={onClick}>
            { copied ? <p>Copiado</p> : <p>Copiar link para compartir en discord.</p> }
        </button>

        <video controls>
            <source src={`${CONTENT_URL}/${video.fileName}`} type="video/mp4"/>
            <source src={`${CONTENT_URL}/${video.fileName}`} type="video/ogg"/>
            <source src={`${CONTENT_URL}/${video.fileName}`} type="video/mov"/>
            Your browser does not support HTML5 video.
        </video>
        


        <style jsx>{`
            .copy-icon {
                width: 32px;
                height: 32px;
                background-color: brown;
            }

            #page {
                height: auto;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            video {
                height: 75vh;
            }

            button {
                position: absolute;
                width: 160px;
                left: 0;
                margin: 20px;
                display: inline-block;
                padding: 15px 25px;
                font-size: 15px;
                cursor: pointer;
                text-align: center;
                text-decoration: none;
                
                outline: none;
                color: #fff;
                background-color: #4CAF50;
                border: none;
                border-radius: 15px;
                box-shadow: 0 9px #999;
            }

            button:hover {background-color: #3e8e41}

            button:active {
                background-color: #3e8e41;
                box-shadow: 0 5px #666;
                transform: translateY(4px);
            }
        `}</style>
    </div> 
}

export default ({ video }: Props) => <PageLayout>
    <HeadOGVideo
        title={video.name}
        description={video.name}
        videoUrl={`${CONTENT_URL}/${video.fileName}`} 
        videoSecureUrl={`${CONTENT_URL}/${video.fileName}`} 
        />
    <Index video={video}/>
</PageLayout>

export async function getServerSideProps(context) {
    let idOrName = context.params.idOrName as string;
    let video: Video | undefined = undefined;

    try {
        video = (await get(`${API_URL}/video/${idOrName}/get`)).video
    } catch (err) {
        video = null;
    }
    
    return {
        props: { video }, // will be passed to the page component as props
    }
}
