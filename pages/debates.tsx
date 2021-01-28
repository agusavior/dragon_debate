import PageLayout from '../components/PageLayout'
import { useState, useEffect } from 'react'
import Debate from '../interfaces/debate'
import backendRequest from '../utils/backendRequest'
import DebateCard from '../components/DebateCard'

const Index = () => {
    const [debates, setDebates] = useState([] as Debate[])

    useEffect(() => {
        
        backendRequest('api/debates', (res) => setDebates(res.data))
        console.log('e')
    }, [])

    return <div>
            <h1>Debates</h1>
            { debates.map((debate, index) => <DebateCard key={index} debate={debate}/>) }
        </div>
}


export default () => <PageLayout> <Index/> </PageLayout>
