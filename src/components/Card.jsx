import React, {useEffect} from 'react'
import { useState } from 'react'
import './Card.css'
import edit from '../assets/editButton.png'
import { supabase } from '../client'
import { Link } from 'react-router-dom'

const Card = (props) => {
    const [likeCount, setLikeCount] = useState(props.like_count);
    const [commentCount, setCommentCount] = useState(props.like_count);
    const showEditButton = props.token.user.id == props.user_id;

    useEffect(() => {
        if (props.like_count !== likeCount) {
            setLikeCount(props.like_count);
        }
        if (props.comment_count !== commentCount) {
            setCommentCount(props.comment_count);
        }
    }, [props]);

    const updateLikeCount = async (event) => {
        event.preventDefault();
        // Update in Supabase
        await supabase
            .from('Posts')
            .update({ like_count: likeCount + 1 })
            .eq('id', props.id)

        // Update State Variable
        setLikeCount((likeCount) => likeCount + 1);
    }

    const updateCommentCount = async (event) => {
        event.preventDefault();
        // Update in Supabase
        await supabase
            .from('Posts')
            .update({ comment_count: commentCount + 1 })
            .eq('id', props.id)

        // Update State Variable
        setCommentCount((commentCount) => commentCount + 1);
    }

    return (
        <div className="Card">
            <div className="header-container">
                <h1 className="title">{props.title.length >= 20 ? props.title.substring(0, 19) + "..." : props.title}</h1>
                {showEditButton && <Link to={`/edit/${props.id}`}><img className="editButton" alt="edit button" src={edit} /></Link>}
            </div>
            <h4 className="author">{"by " + props.author}</h4>
            <p className="description">{props.description}</p>
            <button className="likeButton" onClick={updateLikeCount} >Likes: {likeCount}</button>
            <button className="likeButton" onClick={updateCommentCount} >Comments: {commentCount}</button>
        </div>
    );
};

export default Card;