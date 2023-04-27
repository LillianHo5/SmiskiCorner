import { useState } from 'react';
import { supabase } from '../client'
import '../pages/CreatePost.css'
import {useLocation, useParams} from "react-router-dom";

const CreateComment = ({ data, token }) => {
    const { id } = useParams();
    const [comment, setComment]
        = useState({ title: "", author: "", user_id: "", description: "", post_id: "" });
    const [post, setPost] = useState(data.filter(item => item.id == id)[0]);
    const [commentCount, setCommentCount] = useState(post.comment_count);
    const location = useLocation();
    const postId = location.state.postId;

    console.log(post)
    const handleChange = (event) => {
        const { name, value } = event.target;

        setComment((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const createComment = async (event) => {
        event.preventDefault();

        await supabase
            .from('Comments')
            .insert({ user_id: token.user.id,
                author: token.user.user_metadata.username,
                description: comment.description,
                post_id: postId
            })
            .select();

        await supabase
            .from('Posts')
            .update({ comment_count: commentCount + 1 })
            .eq('id', postId)

        setCommentCount(commentCount + 1);

        window.location = "/home";
    }


    return (
        <div>
            <form className='create-comment'>
                <label className='create-input' htmlFor="comment">Comment</label><br />
                <textarea rows="5" cols="50" value={comment.description} onChange={handleChange} name="description">
                </textarea>
                <br />
                <input type="submit" className="submitButton" onClick={createComment} value="Submit" />
            </form>
        </div>
    )
}

export default CreateComment