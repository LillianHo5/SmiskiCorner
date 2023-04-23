import React, {useState} from 'react';
import {Link, useNavigate } from "react-router-dom";
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
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='Email'
                    name='email'
                    onChange={handleChange}
                />
                <input
                    placeholder='Password'
                    name='password'
                    type="password"
                    onChange={handleChange}
                />
                <button type='submit'>
                    Login
                </button>
            </form>
            Don't have an account? <Link to="/signup">Sign Up!</Link>
        </div>
    )
}

export default Login