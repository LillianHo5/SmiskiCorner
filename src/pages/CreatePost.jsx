import { useState } from 'react';
import { supabase } from '../client'
import './CreatePost.css'
import {useNavigate} from "react-router-dom";

const CreatePost = ({ token }) => {
    let navigate = useNavigate();
    const [post, setPost]
        = useState({ title: "", author: "", user_id: "", description: "", tags: []});
    const handleChange = (event) => {
        const { name, type } = event.target;

        setPost((prev) => {
            const checked = event.target.checked;
            const value = event.target.value;

            return {
                ...prev,
                [name]:
                    type === "checkbox"
                        ? checked
                            ? [...prev[name], value]
                            : prev[name].filter((tag) => tag !== value)
                        : value,
            };
        });
    };


    const createPost = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .insert({ title: post.title,
                author: token.user.user_metadata.username,
                user_id: token.user.id,
                description: post.description,
                tags: post.tags })
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
                <label htmlFor="tags">Tags</label> <br />
                <div className="tags-group">
                    <div className="tag-options">
                        <input type="checkbox" id="trade" name="tags" value="Trade" onChange={handleChange} />
                        <label htmlFor="trade">Trade</label><br />
                    </div>
                    <div className="tag-options">
                        <input type="checkbox" id="general" name="tags" value="General" onChange={handleChange} />
                        <label htmlFor="general">General</label><br />
                    </div>
                    <div className="tag-options">
                        <input type="checkbox" id="question" name="tags" value="Question" onChange={handleChange} />
                        <label htmlFor="question">Question</label>
                    </div>
                    <div className="tag-options">
                        <input type="checkbox" id="misc" name="tags" value="Misc." onChange={handleChange} checked={post.tags.includes("Misc.")} />
                        <label htmlFor="misc">Misc.</label>
                    </div>
                </div>
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