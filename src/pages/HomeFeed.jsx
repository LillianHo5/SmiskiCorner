import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Card from "../components/Card.jsx";
import "./HomeFeed.css"

const HomeFeed = ({ token, data }) => {
    let navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [sortedPosts, setSortedPosts] = useState([]);

    console.log(posts)

    useEffect(() => {
        setPosts(data);
    }, data);

    function handleCreatePost() {
        navigate('/new');
    }

    function handleLikedFilter() {
        const sortedList = [...posts];
        if (sortedList.length > 0) {
            sortedList.sort(function(a, b) {
                return b.like_count - a.like_count;
            })
        }

        setSortedPosts(sortedList);
    }

    function handleRecentFilter() {
        const sortedList = [...posts];
        if (sortedList.length > 0) {
            sortedList.sort(function(a, b) {
                return new Date(b.created_at) - new Date(a.created_at);
            })
        }

        setSortedPosts(sortedList);
    }

    function handleCardClick(id, count, event) {
        console.log("HEREEE")
        // Check if the clicked element is the button inside the card
        if (event.target.tagName === 'BUTTON') {
            return;
        }
        navigate(`/post/${id}`)
    }

    return (
        <div>
            <h2>Welcome back, {token.user.user_metadata.full_name}</h2>
            <div className="Sort">
                <h3>Sort By:</h3>
                <button onClick={handleLikedFilter}>Most Liked</button>
                <button onClick={handleRecentFilter}>Most Recent</button>
            </div>
            <div className="ReadPosts">
                { sortedPosts.length > 0 ?
                    (posts && posts.length > 0 ?
                        sortedPosts.map((post, index) =>
                            <div className="card-styling" key={post.id} onClick={() => handleCardClick(post.id, post.like_count, event)}>
                                <Card key={post.id}
                                      id={post.id}
                                      title={post.title}
                                      author={post.author}
                                      description={post.description}
                                      like_count={post.like_count}
                                />
                            </div>
                        ) : <h2>{'No posts yet.'}</h2>)
                    :
                    (posts && posts.length > 0 ?
                        posts.map((post, index) =>
                            <div className="card-styling" key={post.id} onClick={() => handleCardClick(post.id, post.like_count, event)}>
                                <Card key={post.id}
                                      id={post.id}
                                      title={post.title}
                                      author={post.author}
                                      description={post.description}
                                      like_count={post.like_count} />
                            </div>
                        ) : <h2>{'No posts yet.'}</h2>)
                }
            </div>
            <button className="new-post" onClick={handleCreatePost}> + </button>
        </div>
    )
}

export default HomeFeed