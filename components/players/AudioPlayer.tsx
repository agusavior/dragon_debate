import React, { ReactElement } from 'react'
import { SOURCE_URL } from '../../utils/backendRequest';

const tagStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 1, 
    top:'-12px',
    left:'2px',
    fontSize:'11px', 
    pointerEvents:'none'
}

interface Props {
    onPlay: (causativeAudioName: string) => void;
    onPause: (causativeAudioName: string) => void;
    audioName: string;
    debateName: string;
}

export default function (props: Props): ReactElement {
    const { debateName, audioName, onPlay, onPause } = props;
    return (
        <div style={{position: 'relative'}}>
            <div style={tagStyle}><p>{audioName}</p></div>
            <audio
            id={audioName}
            style={{width: '60vw', outline: 'none'}}
            controls={true}
            onPause={() => onPause(audioName)} 
            onPlay={() => onPlay(audioName)}
            >
                <source src={`${SOURCE_URL}/debates/${debateName}/${audioName}.flac`} type="audio/flac"/>
                Tu explorador no soporta elementos de audio.
            </audio>
        </div>
    )
}
