import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// admin@gmail.com
// Admin123


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const authenticateAndLogin = async () => {
        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/loginUser', {
                email,
                password
            });
            console.log(response.data.data.user.role);

            if (response.status === 200) {
                const role = response.data.data.user.role;
                if (role === 'admin') {
                    navigate('/admin');
                } else if (role === 'mis') {
                    navigate('/mis');
                }
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Login failed. Please try again.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="LoginPage-container">
            <div className="LoginPage-box">
                <div className="LoginPage-logo">
                    <img src="https://sandnetwork.in/wp-content/uploads/2024/02/sand-logo.png" alt="SAND Logo" />
                </div>
                <div className="LoginPage-content">
                    <div className="content-title">
                        <h1>Welcome To SAND ONE!</h1>
                        <p>Enter the fields below to get started</p>
                    </div>
                    <div className="content-form">
                        <label>
                            Email
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError('');
                                }}
                            />
                        </label>
                        <label>
                            Password
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                            />
                        </label>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button 
                        className="loginBtn" 
                        onClick={authenticateAndLogin}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'LOGIN'}
                    </button>
                </div>  
            </div>
        </div>
    );
};

export default LoginPage;
