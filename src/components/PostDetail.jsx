import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {supabase} from "../client.js";

const PostDetail = () => {
    const params = useParams();
    let [post, setPost] = useState(null);

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

    console.log(post)

    return (
        <div className="post-detail">
            {post ? (
                <div>
                    <h1>{post.title}</h1>
                    <div className="detail-container">
                        <div className="detail-subcontainer">
                            <div>
                                <br />
                                <strong>User:</strong>
                                {post.author}
                            </div>
                            <br />
                            <div>
                                {post.description}
                            </div>
                            <br />
                            <div>
                                <br />
                                <strong>Likes:</strong>
                                {post.like_count}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default PostDetail;