import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/user/login', { email, password });
            const responseData = response.data;
            if (responseData.message === "Login successful") {
                const userInfo = {
                    userId: responseData.userId,
                    userRoleName: responseData.userRoleName,
                    userName: responseData.userName
                };
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                setMessage(responseData.message);
                if(responseData.userRoleName === "Admin") {
                    window.location.href = '/admin/books';
                } else {
                    window.location.href = '/reader/books';
                }
            } else {
                setMessage(responseData.message);
            }
        } catch (error) {
            setMessage('Invalid credentials');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md max-w-[90vw]">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                        <input
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
                        <input
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-700">Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link></p>
                </div>
                {message && <p className="text-red-500 text-center mt-4">{message}</p>}
            </div>
        </div>
    );
};

export default Login;
