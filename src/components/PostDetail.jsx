import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {supabase} from "../client.js";
import "./PostDetail.css"

const PostDetail = () => {
    const params = useParams();
    let [post, setPost] = useState(null);
    const [count, setCount] = useState(post ? post.like_count : null);
    const [formattedDate, setFormattedDate] = useState("");

    // Time posted calculations (after post is retrieved)
    useEffect(() => {
        if (post) {
            const createdDate = new Date(post.created_at);
            const currentDate = new Date();
            const timeDiff = currentDate.getTime() - createdDate.getTime();
            const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

            if (hoursDiff < 1) {
                const minutesDiff = Math.floor(timeDiff / (1000 * 60));
                setFormattedDate(minutesDiff + " minutes ago");
            } else if (hoursDiff < 24) {
                setFormattedDate(hoursDiff + " hours ago");
            } else { // Over 24 hours since post was made
                setFormattedDate(
                    createdDate.toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric"
                    })
                );
            }
        }
    }, [post]);

    useEffect(() => {
        if (post && post.like_count !== count) {
            setCount(post.like_count);
        }
    }, [post]);
    const updateCount = async (event) => {
        event.preventDefault();
        // Update in Supabase
        await supabase
            .from('Posts')
            .update({ like_count: count + 1 })
            .eq('id', post.id)

        // Update State Variable
        setCount((count) => count + 1);
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
                    <h3><strong>Posted by: </strong>{post.author}</h3>
                    <h4 className="detailed-description">{post.description}</h4>
                    <p><strong>Posted: </strong>{formattedDate}</p>
                    <button className="like-btn" onClick={updateCount}>Likes: {count}</button>
                </div>
            ) : null}
        </div>
    );
};

export default PostDetail;