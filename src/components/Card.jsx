import React, {useEffect} from 'react'
import { useState } from 'react'
import './Card.css'
import edit from '../assets/editButton.png'
import { supabase } from '../client'
import {Link, useNavigate} from 'react-router-dom'

const Card = (props) => {
    let navigate = useNavigate();
    const [likeCount, setLikeCount] = useState(props.like_count);
    const [commentCount, setCommentCount] = useState(props.comment_count);
    const showEditButton = props.token.user.id === props.user_id;
    const [isLiked, setIsLiked] = useState("Like");

    useEffect(() => {
        setLikeCount(props.like_count);
    }, [props.like_count]);

    useEffect(() => {
        setCommentCount(props.comment_count);
    }, [props.comment_count]);

    const updateLikeCount = async (event) => {
        event.preventDefault();

        const { data, error } = await supabase
            .from('User_Likes')
            .select()
            .eq('post_id', props.id)
            .eq('user_id', props.user_id)

        if (error) {
            console.error('Error retrieving row:', error);
            return;
        }

        if (data.length > 0) {
            // Like exists, so remove the "like" when the button is clicked
            await supabase
                .from('Posts')
                .update({ like_count: likeCount - 1 })
                .eq('id', props.id);

            // Delete the like from the "User_Likes" table
            await supabase
                .from('User_Likes')
                .delete()
                .eq('post_id', props.id)
                .eq('user_id', props.user_id)

            // Update State Variable
            setLikeCount((likeCount) => likeCount - 1);
            setIsLiked("Like");
        } else {
            // Like doesn't exist, so "like" the post
            await supabase
                .from('Posts')
                .update({ like_count: likeCount + 1 })
                .eq('id', props.id);

            // Keep track of the like in the "User_Likes" table
            await supabase
                .from('User_Likes')
                .insert({ post_id: props.id,
                    user_id: props.user_id })
                .select()

            // Update State Variable
            setLikeCount((likeCount) => likeCount + 1);
            setIsLiked("Unlike");
        }
    };


    function handleCommentClick() {
        navigate(`/comments/${props.id}`, {
            state: {
                postId: props.id
            }
        })
    }

    return (
        <div className="Card">
            <div className="header-container">
                <h1 className="title">{props.title.length >= 20 ? props.title.substring(0, 19) + "..." : props.title}</h1>
                {showEditButton && <Link to={`/edit/${props.id}`}><img className="editButton" alt="edit button" src={edit} /></Link>}
            </div>
            <h4 className="author">{"by " + props.author}</h4>
            <p className="description">{props.description}</p>
            <div className="displayCnt">
                <div className="displayCnt">
                    <p className="likeCount">{likeCount}
                    </p><button className="card-button" onClick={updateLikeCount} >{isLiked}</button>
                </div>
                <button className="card-button" onClick={handleCommentClick} >Comments: {commentCount}</button>
            </div>
        </div>
    );
};

export default Card;