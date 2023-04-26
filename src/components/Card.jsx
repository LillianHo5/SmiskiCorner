import React, {useEffect} from 'react'
import { useState } from 'react'
import './Card.css'
import edit from '../assets/editButton.png'
import { supabase } from '../client'
import { Link } from 'react-router-dom'

const Card = (props) => {
    const [likeCount, setLikeCount] = useState(props.like_count);
    const [commentCount, setCommentCount] = useState(props.comment_count);
    const showEditButton = props.token.user.id == props.user_id;

    useEffect(() => {
        setLikeCount(props.like_count);
    }, [props.like_count]);

    const updateLikeCount = async (event) => {
        event.preventDefault();
        // Update in Supabase
        await supabase
            .from('Posts')
            .update({like_count: likeCount + 1})
            .eq('id', props.id)

        // Update State Variable
        setLikeCount((likeCount) => likeCount + 1);
    }

    return (
        <div className="Card">
            <div className="header-container">
                <h1 className="title">{props.title.length >= 20 ? props.title.substring(0, 19) + "..." : props.title}</h1>
                {showEditButton && <Link to={`/edit/${props.id}`}><img className="editButton" alt="edit button" src={edit} /></Link>}
            </div>
            <h4 className="author">{"by " + props.author}</h4>
            <p className="description">{props.description}</p>
            <button className="card-button" onClick={updateLikeCount} >Likes: {likeCount}</button>
            <Link to={`/comments/${props.id}`}><button className="card-button" >Comments: {commentCount}</button></Link>
        </div>
    );
};

export default Card;