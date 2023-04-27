import React, {useEffect} from 'react'
import { useState } from 'react'
import { supabase } from '../client'
import edit from "../assets/editButton.png";
import { Link } from 'react-router-dom';
import "./Comment.css";

const Comment = (props) => {
    //const [likeCount, setLikeCount] = useState(props.like_count);
    //<button className="card-button" onClick={updateLikeCount} >Likes: {likeCount}</button>
    //                {showEditButton && <Link to={`/edit/${props.id}`}><img className="editButton" alt="edit button" src={edit} /></Link>}
    const showEditButton = props.token.user.id === props.user_id;

    return (
        <div className="Comment">
            <div className="comment-header">
                <h4 className="author">{props.author}</h4>
            </div>
            <p className="comment-description">{props.description}</p>
        </div>
    );
};

export default Comment;