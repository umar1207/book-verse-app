import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setUserName] = useState('');
    const [userRoleName, setUserRoleName] = useState('Reader'); // Default role
    const [message, setMessage] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false); 
    const navigate = useNavigate(); 

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/user', { name, email, password, userRoleName });
            const statusCode = response.status;
            if (statusCode === 200) {
                setMessage('Signup successful. You can now log in.');
                setSignupSuccess(true);

                setEmail('');
                setPassword('');
                setUserName('');
                setUserRoleName('Reader');
            } else {
                setMessage('Signup Failed');
            }
        } catch (error) {
            setMessage(error.response.data);
        }
    };

    useEffect(() => {
        if (signupSuccess) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [signupSuccess, navigate]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md max-w-[90vw]">
                <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Username:</label>
                        <input
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Enter your username"
                            value={name}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                        <input
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
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
                        Signup
                    </button>
                </form>
                {message && <p className="text-red-500 text-center mt-4">{message}</p>}
            </div>
        </div>
    );
};

export default Signup;
