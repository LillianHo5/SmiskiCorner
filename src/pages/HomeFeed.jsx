import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Card from "../components/Card.jsx";
import "./HomeFeed.css"

const HomeFeed = ({ token, data }) => {
    let navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [sortedPosts, setSortedPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [mostLikedDisabled, setMostLikedDisabled] = useState(false);
    const [mostRecentDisabled, setMostRecentDisabled] = useState(true);

    console.log(posts)

     useEffect(() => {
         setPosts(data);
    }, data);

    function handleCreatePost() {
        navigate('/new');
    }

    function handleLikedFilter() {
        if (mostRecentDisabled) {
            setSortedPosts(posts);
        }
        let sortedList = [...posts];
        if (sortedPosts.length >  0) {
            sortedList = [...sortedPosts];
        }
        if (sortedList.length > 0) {
            sortedList.sort(function(a, b) {
                return b.like_count - a.like_count;
            })
        }

        // Disable the "Most Liked" button and enable the "Most Recent" button
        setMostLikedDisabled(true);
        setMostRecentDisabled(false);

        setSortedPosts(sortedList);
    }

    function handleRecentFilter() {
        if (mostLikedDisabled) {
            setSortedPosts(posts);
        }
        let sortedList = [...posts];
        if (sortedPosts.length >  0) {
            sortedList = [...sortedPosts];
        }
        if (sortedList.length > 0) {
            sortedList.sort(function(a, b) {
                return new Date(b.created_at) - new Date(a.created_at);
            })
        }

        // Enable the "Most Liked" button and disable the "Most Recent" button
        setMostLikedDisabled(false);
        setMostRecentDisabled(true);

        setSortedPosts(sortedList);
    }

    function handleCardClick(id, count, event) {
        // Check if the clicked element is the button inside the card
        if (event.target.tagName === 'BUTTON' || event.target.tagName === 'IMG') {
            return;
        }
        navigate(`/post/${id}`)
    }

    const searchItems = searchValue => {
        setSearchInput(searchValue);
        if (searchValue !== "") {
            const filteredPosts = posts.filter((post) =>
                post.title.toLowerCase().includes(searchValue.toLowerCase())
                //post.description.toLowerCase().includes(searchValue.toLowerCase()) ||
                //post.author.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredPosts(filteredPosts);
        } else {
            setFilteredPosts(posts);
        }
    };

    return (
        <div>
            <h2>Welcome back, {token.user.user_metadata.full_name}</h2>
            <div className="Filter">
                <input
                    className='text-search'
                    type="text"
                    placeholder="Search for a post title!"
                    onChange={(inputString) => searchItems(inputString.target.value)}
                />
            </div>
            <div className="Sort">
                <h3>Sort By:</h3>
                <button onClick={handleLikedFilter} disabled={mostLikedDisabled}>Most Liked</button>
                <button onClick={handleRecentFilter} disabled={mostRecentDisabled}>Most Recent</button>
            </div>
            <div className="ReadPosts">
                {(filteredPosts && filteredPosts.length > 0) ?
                    filteredPosts.map((post, index) =>
                        <div className="card-styling" key={post.id} onClick={() => handleCardClick(post.id, post.like_count, event)}>
                            <Card key={post.id}
                                  id={post.id}
                                  title={post.title}
                                  author={post.author}
                                  description={post.description}
                                  like_count={post.like_count}
                            />
                        </div>
                    )
                    : (sortedPosts && sortedPosts.length > 0) ?
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
                        )
                        : (posts && posts.length > 0) ?
                            posts.map((post, index) =>
                                <div className="card-styling" key={post.id} onClick={() => handleCardClick(post.id, post.like_count, event)}>
                                    <Card key={post.id}
                                          id={post.id}
                                          title={post.title}
                                          author={post.author}
                                          description={post.description}
                                          like_count={post.like_count}
                                    />
                                </div>
                            )
                            : <h2>No posts yet.</h2>
                }
            </div>
            <button className="new-post" onClick={handleCreatePost}> + </button>
        </div>
    )
}

export default HomeFeed