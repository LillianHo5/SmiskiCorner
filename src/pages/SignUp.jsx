import React, {useState} from 'react'
import { supabase } from '../client.js'
import './SignUp.css'
import {Link} from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirm_password: ''
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

        if (formData.password !== formData.confirm_password) {
            alert("Passwords don't match.");
            return;
        }
        try {
            const {data, error} = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName,
                        username: formData.username
                    }
                }
            })
            if(error) throw error
            alert("Check your email for a verification link.")
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input
                    className="signup-input"
                    placeholder='Name'
                    name='fullName'
                    onChange={handleChange}
                />
                <input
                    className="signup-input"
                    placeholder='Username'
                    name='username'
                    onChange={handleChange}
                />
                <input
                    className="signup-input"
                    placeholder='Email'
                    name='email'
                    onChange={handleChange}
                />
                <input
                    className="signup-input"
                    placeholder='Password'
                    name='password'
                    type="password"
                    onChange={handleChange}
                />
                <input
                    className="signup-input"
                    placeholder='Confirm Password'
                    name='confirm_password'
                    type="password"
                    onChange={handleChange}
                />
                <button type='submit'>
                    Sign Up
                </button>
            </form>
            Already have an account? <Link to="/">Login</Link>
        </div>
    )
}

export default SignUp