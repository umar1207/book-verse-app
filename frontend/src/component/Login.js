import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/user/login', { email: email, password: password });
            const responseData = response.data;
            if (responseData.message === "Login successful") {
                const userInfo = {
                    userId: responseData.userId,
                    userRoleName: responseData.userRoleName
                };
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                setMessage(responseData.message + " " + responseData.userRoleName + " " + responseData.userId);
                if(responseData.userRoleName === "Admin") {
                    window.location.href = '/users';
                }
                else {
                    window.location.href = '/books';
                }
            } else {
                setMessage(responseData.message);
            }
        } catch (error) {
            setMessage('Invalid credentials');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
