import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import Comment from "./Comment.jsx"
import comment_icon from "../assets/comment.png"
import './CommentsDetail.css'

const CommentsDetail = ({ coms, token }) => {
    let navigate = useNavigate();
    const location = useLocation();
    const postId = location.state.postId;
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let comList = [];
        for (const comment of coms) {
            if (comment.post_id == postId) {
                comList.push(comment);
            }
        }
        setComments(comList);
    }, [coms, postId]);

    function handleCreateComment() {
        navigate(`/newComment/${postId}`, {
            state: {
                postId: postId
            }
        })
    }

    return (
        <div className="CommentsDetail">
            <button className="new-comment" onClick={handleCreateComment}>
                New Comment
                <img className="comment_icon" src={comment_icon} style={{ width: '30px', marginLeft: '10px' }} />
            </button>
            {(comments && comments.length > 0) ?
                comments.map((comment, index) =>
                        <div className="card-styling" key={comment.id} >
                            <Comment key={comment.id}
                                     id={comment.id}
                                     author={comment.author}
                                     description={comment.description}
                                     user_id={comment.user_id}
                                     post_id={comment.post_id}
                                     token={token}
                            />
                        </div>
                )
                : <h2>No Comments yet.</h2>
            }
        </div>
    );
};

export default CommentsDetail;