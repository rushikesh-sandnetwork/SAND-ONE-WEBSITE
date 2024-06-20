import React, { useState } from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const authenticateAndLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/users/loginUser', {
                email,
                password
            });

            if (response.status === 200) {
                console.log(response);                
                if (response.data["data"]["role"] === "admin") {
                    navigate('/admin');
                } else if (response.data["data"]["role"] === "mis") {
                    navigate('/mis');
                }
            } else {
                setError('Login failed. Please try again.');
            }
            
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                setError(error.response.data.message || 'Login failed. Please try again.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="LoginPage-container">
            <div className="LoginPage-box">
                <div className="LoginPage-logo">
                    <img src="https://sandnetwork.in/wp-content/uploads/2024/02/sand-logo.png" alt="" />
                </div>
                <div className="LoginPage-content">
                    <div className="content-title">
                        <h1>Welcome To SAND ONE!</h1>
                        <p>Enter the fields below to get started</p>
                    </div>

                    <div className="content-form">
                        <p>Email</p>
                        <input 
                            type="text" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <p>Password</p>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="error">{error}</p>}

                    <input 
                        className='loginBtn' 
                        type="button" 
                        value="LOGIN" 
                        onClick={authenticateAndLogin}
                    />
                </div>  
            </div>
        </div>
    );
}

export default LoginPage;
