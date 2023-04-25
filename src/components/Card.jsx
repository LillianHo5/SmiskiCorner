import React from 'react'
import { useState } from 'react'
import './Card.css'
import { supabase } from '../client'
import { Link } from 'react-router-dom'

const Card = (props) => {

    const [count, setCount] = useState(0)
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
            <h2 className="title">{props.title}</h2>
            <h3 className="author">{"by " + props.author}</h3>
            <p className="description">{props.description}</p>
            <button className="betButton" onClick={updateCount} >Likes: {count}</button>
        </div>
    );
};

export default Card;