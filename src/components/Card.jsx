import React, {useEffect} from 'react'
import { useState } from 'react'
import './Card.css'
import edit from '../assets/editButton.png'
import { supabase } from '../client'
import { Link } from 'react-router-dom'

const Card = (props) => {
    const [count, setCount] = useState(props.like_count);
    const showEditButton = props.token.user.id == props.user_id;

    useEffect(() => {
        if (props.like_count !== count) {
            setCount(props.like_count);
        }
    }, [props]);
    const updateCount = async (event) => {
        event.preventDefault();
        // Update in Supabase
        await supabase
            .from('Posts')
            .update({ like_count: count + 1 })
            .eq('id', props.id)

        // Update State Variable
        setCount((count) => count + 1);
    }

    return (
        <div className="Card">
            <div className="header-container">
                <h1 className="title">{props.title.length >= 20 ? props.title.substring(0, 19) + "..." : props.title}</h1>
                {showEditButton && <Link to={`/edit/${props.id}`}><img className="editButton" alt="edit button" src={edit} /></Link>}
            </div>
            <h4 className="author">{"by " + props.author}</h4>
            <p className="description">{props.description}</p>
            <button className="likeButton" onClick={updateCount} >Likes: {count}</button>
        </div>
    );
};

export default Card;