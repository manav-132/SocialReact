import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const [error, setError] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        
        // Reset error state
        setError('');

        // Check if passwords match
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
            return;
        }
        passwordAgain.current.setCustomValidity("");

        const user = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
        };

        try {
            await axios.post("https://social-7tc4.onrender.com/api/auth/register", user);
            // Redirect to login page
            window.location.href = "/login";
        } catch (err) {
            setError("Registration failed. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className='w-[100vw] h-[100vh] bg-[#f0f2f5] flex items-center justify-center'>
            <div id="loginwrapper" className='w-[70%] h-[70%] flex'>
                <div id="loginleft" className='flex-[1] flex flex-col justify-center'>
                    <h3 className='font-bold text-[50px] text-[#1775ee]'>Happyial</h3>
                    <span className='text-[24px]'>Connect with friends and share some happy<br /> moments with them at Happyial</span>
                </div>
                <div id="loginright">
                    <form id="loginbox" onSubmit={handleClick} className='h-[600px] w-[600px] p-5 bg-white rounded-xl flex flex-col justify-between'>
                        <input
                            placeholder='Username'
                            required
                            ref={username}
                            className='h-16 rounded-xl border-[2px] border-gray-500 p-5 text-lg outline-none'
                        />
                        <input
                            placeholder='Email'
                            type="email"
                            required
                            ref={email}
                            className='h-16 rounded-xl border-[2px] border-gray-500 p-5 text-lg outline-none'
                        />
                        <input
                            placeholder='Password'
                            type="password"
                            required
                            ref={password}
                            className='h-16 rounded-xl border-[2px] border-gray-500 p-5 text-lg outline-none'
                        />
                        <input
                            placeholder='Password Again'
                            type="password"
                            required
                            ref={passwordAgain}
                            className='h-16 rounded-xl border-[2px] border-gray-500 p-5 text-lg outline-none'
                        />
                        {error && <p className='text-red-500 text-lg'>{error}</p>} {/* Display error message */}
                        <button
                            className='h-16 rounded-xl border-none bg-[#1775ee] text-white text-xl font-medium cursor-pointer'
                            type="submit"
                        >
                            Sign Up
                        </button>
                        <p className='text-center text-lg mt-4'>
                            Already have an account? <Link to="/login" className='text-[#1775ee] hover:underline'>Go to Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
