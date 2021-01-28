import Comment from "../../interfaces/comment"
import { useEffect, useState } from "react"
import { get } from "../../utils/customAxios"
import { API_URL } from "../../constants"
import User from "../../interfaces/user"

interface Props {
    comment: Comment;
}

export default ({ comment }: Props) => {
    const [author, setAuthor] = useState<null | User>(null)

    async function fillAuthor() {
        try {
            const { user } = await get(`${API_URL}/users/${comment.author}/get`)
            setAuthor(user);
        } catch(err) {
            setAuthor(null)
        }
    }

    useEffect(() => {
        fillAuthor()
    }, [])

    return <div className='comment'>
        
        <div><p> { comment.text } </p></div> 
    
        <div className='comment-footer' >
            { author && <p>{author.name}</p> } 
            { author && <img src={author.avatarUrl} alt="Avatar" className="avatar"/> }
        
        </div>

    <style jsx>{`

.comment {
    display: flex;
    flex-direction: column;
    background-color: yellow;
    overflow: hidden;
    white-space: wrap;
}

.comment-footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    
}

.avatar {
    vertical-align: middle;
    width: 32px;
    height: 32px;
    margin: 5px;
    border-radius: 50%;
}

    `}</style>
    
    </div>
}