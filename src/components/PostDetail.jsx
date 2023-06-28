import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {supabase} from "../client.js";
import "./PostDetail.css"

const PostDetail = () => {
    const params = useParams();
    let navigate = useNavigate()
    let [post, setPost] = useState(null);
    //const [count, setCount] = useState(post ? post.like_count : null);
    const [token, setToken] = useState(false);
    const [likeCount, setLikeCount] = useState(post ? post.like_count : null);
    const [isLiked, setIsLiked] = useState("Like");
    const [commentCount, setCommentCount] = useState(post ? post.comment_count : null);
    const [formattedDate, setFormattedDate] = useState("");

    if(token){
        sessionStorage.setItem('token',JSON.stringify(token))
    }

    useEffect(() => {
        if(sessionStorage.getItem('token')){
            let data = JSON.parse(sessionStorage.getItem('token'))
            setToken(data)
        }

    }, [])

    // Time posted calculations (after post is retrieved)
    useEffect(() => {
        if (post) {
            const createdDate = new Date(post.created_at);
            const currentDate = new Date();
            const timeDiff = currentDate.getTime() - createdDate.getTime();
            const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

            if (hoursDiff < 1) {
                const minutesDiff = Math.floor(timeDiff / (1000 * 60));
                setFormattedDate(" " + minutesDiff + " minutes ago");
            } else if (hoursDiff < 24) {
                setFormattedDate(" " + hoursDiff + " hours ago");
            } else { // Over 24 hours since post was made
                setFormattedDate("on " +
                    createdDate.toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric"
                    })
                );
            }
        }
    }, [post]);

    // Update like count and comment count to match Supabase table
    useEffect(() => {
        if (post && post.like_count !== likeCount) {
            setLikeCount(post.like_count);
        }
        if (post && post.comment_count !== commentCount) {
            setCommentCount(post.comment_count)
        }
    }, [post]);

    const updateCount = async (event) => {
        event.preventDefault();

        const { data, error } = await supabase
            .from('User_Likes')
            .select()
            .eq('post_id', post.id)
            .eq('user_id', token.user.id) // current user

        if (error) {
            console.error('Error retrieving row:', error);
            return;
        }

        if (data.length > 0) {
            // Like exists, so remove the "like" when the button is clicked
            await supabase
                .from('Posts')
                .update({ like_count: likeCount - 1 })
                .eq('id', post.id);

            // Delete the like from the "User_Likes" table
            await supabase
                .from('User_Likes')
                .delete()
                .eq('post_id', post.id)
                .eq('user_id', token.user.id)

            // Update State Variable
            setLikeCount((likeCount) => likeCount - 1);
            setIsLiked("Like");
        } else {
            // Like doesn't exist, so "like" the post
            await supabase
                .from('Posts')
                .update({ like_count: likeCount + 1 })
                .eq('id', post.id);

            // Keep track of the like in the "User_Likes" table
            await supabase
                .from('User_Likes')
                .insert({ post_id: post.id,
                    user_id: token.user.id })
                .select()

            // Update State Variable
            setLikeCount((likeCount) => likeCount + 1);
            setIsLiked("Unlike");
        }
    };
    // const updateCount = async (event) => {
    //     event.preventDefault();
    //     // Update in Supabase
    //     await supabase
    //         .from('Posts')
    //         .update({ like_count: likeCount + 1 })
    //         .eq('id', post.id)
    //
    //     // Update State Variables
    //     const updatedPost = { ...post, like_count: likeCount + 1 };
    //     setPost(updatedPost);
    //     setLikeCount((likeCount) => likeCount + 1);
    // }

    function handleCommentClick() {
        navigate(`/comments/${params.id}`, {
            state: {
                postId: params.id
            }
        })
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('Posts')
                .select()

            if (data) {
                for (let i = 0; i < data.length; i++){
                    console.log(data[i].id)
                    if(data[i].id == params.id) {
                        setPost(data[i]);
                    }
                }
            }

        }
        fetchPosts().catch(console.error)
    }, []);

    return (
        <div className="post-detail">
            {post ? (
                <div className="post-container">
                    <h1>{post.title}</h1>
                    <h3><strong>Posted by </strong>{post.author}</h3>
                    <h4 className="detailed-description">{post.description}</h4>
                    <p><strong>Posted </strong>{formattedDate}</p>
                    <div className="displayCnt">
                        <div className="displayCnt">
                            <p className="likeCount">{likeCount}</p>
                            <button className="detail-btn" onClick={updateCount}>{isLiked}</button>
                        </div>
                        <button className="detail-btn" onClick={handleCommentClick} >Comments: {commentCount}</button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default PostDetail;