import React, { ReactElement, useEffect, useState } from 'react'

import AudioPlayer from './AudioPlayer'

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f1f3f4',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
}

interface Props {
    debateName: string;
    audios: string[];
}

export default function(props: Props): ReactElement {
    const { debateName, audios } = props;

    if (debateName === undefined)
        return <div/>;

    const onPlay = (causativeAudioName: string) => {
        let causativeAudio = document.getElementById(causativeAudioName) as HTMLAudioElement;

        for (const audio of audios) {
            let a = document.getElementById(audio) as HTMLAudioElement;
            a.currentTime  = causativeAudio.currentTime;
            a.play();
        }
    }

    const onPause = (causativeAudioName: string) => {
        let causativeAudio = document.getElementById(causativeAudioName) as HTMLAudioElement;

        for (const audio of audios) {
            let a = document.getElementById(audio) as HTMLAudioElement;
            a.currentTime  = causativeAudio.currentTime;
            a.pause();
        }
    }

    return (
        <div style={style}>
            { audios.map(audio => {
                return <AudioPlayer
                    key={audio}
                    debateName={debateName}
                    audioName={audio}
                    onPlay={onPlay}
                    onPause={onPause}
                    />
            })}
        </div>
    )
}
