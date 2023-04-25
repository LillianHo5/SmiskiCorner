import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Card from "../components/Card.jsx";

const HomeFeed = ({ token, data }) => {
    let navigate = useNavigate();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(data);
    }, data);

    function handleCreatePost() {
        navigate('/new');
    }

    return (
        <div>
            <h3>Welcome back, {token.user.user_metadata.full_name}</h3>
            <div>
                <h3>Filter By:</h3>
            </div>
            <div className="ReadPosts">
                {
                    posts && posts.length > 0 ?
                        posts.map((post, index) =>
                            <Card id={post.id} title={post.title} author={post.author} description={post.description}/>
                        ) : <h2>{'No posts yet.'}</h2>
                }
            </div>
            <button className="new-post" onClick={handleCreatePost}> + </button>
        </div>
    )
}

export default HomeFeed