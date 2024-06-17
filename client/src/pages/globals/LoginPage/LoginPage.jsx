import React from 'react'
import './LoginPage.css';
const LoginPage = () => {
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
                        <input type="text" name="" id="" />

                        <p>Password</p>
                        <input type="password" name="" id="" />
                    </div>

                    <input className='loginBtn' type="button" value="LOGIN" />

                </div>
            </div>
        </div>
    )
}

export default LoginPage
