import React, { useContext, useRef, useState } from 'react';
import { loginCall } from '../../../apicalls';
import { Authcontext } from '../../context/authcontext';
import { Link } from 'react-router-dom';

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(Authcontext);
    const [error, setError] = useState(null);

    const handleClick = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        const emailValue = email.current.value;
        const passwordValue = password.current.value;

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailValue)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            await loginCall({ email: emailValue, password: passwordValue }, dispatch);
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className='w-[100vw] h-[100vh] bg-[#f0f2f5] flex items-center justify-center'>
            <form id="loginwrapper" className='w-[70%] h-[70%] flex' onSubmit={handleClick}>
                <div id="loginleft" className='flex-[1] flex flex-col justify-center'>
                    <h3 className='font-bold text-[50px] text-[#1775ee]'>Happyial</h3>
                    <span className='text-[24px]'>
                        Connect with friends and share some happy<br />
                        moments with them at Happyial
                    </span>
                </div>
                <div id="loginright">
                    <div id="loginbox" className='h-[500px] w-[600px] p-5 bg-white rounded-xl flex flex-col justify-between'>
                        {error && <div className='text-red-500'>{error}</div>}
                        <input
                            placeholder='Email'
                            type="email"
                            className='h-20 rounded-xl border-[2px] border-gray-500 p-5 text-lg outline-none'
                            required
                            ref={email}
                        />
                        <input
                            placeholder='Password'
                            type="password"
                            minLength="6"
                            className='h-20 rounded-xl border-[2px] border-gray-500 p-5 text-lg outline-none'
                            required
                            ref={password}
                        />
                        <button
                            type='submit'
                            className={`h-20 rounded-xl border-none bg-[#1775ee] text-white text-xl font-medium cursor-pointer ${isFetching ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isFetching}
                        >
                            Log In
                        </button>
                        <Link
                            to="/register"
                            className='h-16 rounded-xl border-none bg-[#42b72a] text-white text-xl font-medium flex items-center justify-center mt-4'
                        >
                            Create a New Account
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
