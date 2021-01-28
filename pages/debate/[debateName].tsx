import React, { useState, useEffect } from 'react'
import backend, { SOURCE_URL } from '../../utils/backendRequest'
import { useRouter } from 'next/router'
import PageLayout from '../../components/PageLayout'
import HeadOG from '../../components/headers/HeadOG'

import AudioPlayerSet from '../../components/players/AudioPlayerSet'

type DebateData = {
    title: string;
    description: string;
    audios: string[];
} | undefined

const Index = () => {
    const [data, setData] = useState(undefined as DebateData)

    const router = useRouter()
    const debateName = router.query.debateName as string

    useEffect(() => {
        if (debateName !== undefined) {
            backend(`api/debates/${debateName}`, (res) => {
                console.log('res', res)
                setData(res.data as DebateData)
            })
        }
    }, [debateName])

    if (data === undefined)
        return <div><p>Debate no encontrado.</p></div>

    return <div>
        <HeadOG
        title={data.title}
        description={data.description}
        imageURL={`${SOURCE_URL}/debates/${debateName}/image.png`}
        />
        <div>
            <h1>{data.title}</h1>
            <h5>{data.description}</h5>
            <AudioPlayerSet debateName={debateName} audios={data.audios} />
        </div>
    </div>
}

export default () => <PageLayout> <Index/> </PageLayout>
