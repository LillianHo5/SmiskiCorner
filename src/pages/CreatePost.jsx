import { useState } from 'react';
import { supabase } from '../client'
import './CreatePost.css'
import {useNavigate} from "react-router-dom";

const CreatePost = ({ token }) => {
    let navigate = useNavigate();
    const [post, setPost] = useState({ title: "", author: "", user_id: "", description: "" });
    const handleChange = (event) => {
        const { name, value } = event.target;

        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }
    const createPost = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .insert({ title: post.title,
                author: token.user.user_metadata.username,
                user_id: token.user.id,
                description: post.description })
            .select();

        //window.location = "/home";
        navigate("/home");
    }


    return (
        <div>
            <form className='create-post'>
                <label htmlFor="title">Title</label> <br />
                <input className='create-input' type="text" id="title" value={post.title} onChange={handleChange} name="title" /><br />
                <br />
                <label className='create-input' htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" value={post.description} onChange={handleChange} name="description">
                </textarea>
                <br />
                <input type="submit" onClick={createPost} value="Submit" />
            </form>
        </div>
    )
}

export default CreatePost