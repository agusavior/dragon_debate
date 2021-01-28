import React, { ReactElement, useState, useEffect } from 'react'
import { SOURCE_URL } from '../../utils/backendRequest';
import { get } from '../../utils/customAxios';
import { API_URL } from '../../constants';
import Comment from '../../interfaces/comment'
import CommentComponent from '../../components/comments/Comment'

interface Props {
    nodeName: string;
}

export default ({ nodeName }: Props) => {
    const [comments, setComments] = useState<Comment[]>([])

    async function fillComments() {
        try {
            const { comments } = await get(`${API_URL}/comments/getFromNode/${nodeName}`)
            setComments(comments);
        } catch(err) {
            console.log('err', err)
        }
    }
    
    useEffect(() => {
        fillComments()
    }, [])

    return (
        <div className='comment-section'>
            { comments.map(comment => <CommentComponent key={0 /** TODO */} comment={comment} />) }

<style jsx>{`

.comment-section {
    display: flex;
    flex-direction: column;
    width: 80%;
    background-color: blue;
}

`}</style>

        </div>
    )
}
