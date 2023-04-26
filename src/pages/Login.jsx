import React, {useState} from 'react';
import {Link, useNavigate } from "react-router-dom";
import './Login.css'
import cheer from '../assets/smiski-cheer.png'
import {supabase} from "../client.js";

const Login = ({ setToken }) => {
    let navigate=  useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    console.log(formData)

    function handleChange(event) {
        setFormData((prevFormData)=> {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            })
            if(error) throw error
            console.log(data)
            setToken(data)
            navigate('/home')

        } catch (error) {
                alert(error.message);
        }
    }

    return (
        <div>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    className="login-input"
                    placeholder='Email'
                    name='email'
                    onChange={handleChange}
                />
                <input
                    className="login-input"
                    placeholder='Password'
                    name='password'
                    type="password"
                    onChange={handleChange}
                />
                <button className="login-btn" type='submit'>
                    Login
                </button>
            </form>
            Don't have an account? <Link to="/signup">Sign Up!</Link>
            <img className="smiski-cheer" src={cheer}/>
        </div>
    )
}

export default Login