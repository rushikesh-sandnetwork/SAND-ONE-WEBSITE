import React from 'react'
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = () => {

    const navigate = useNavigate()

    function authenticateAndLogin(){
        // function definition need to be defined but it is fine for now 
        navigate('/admin');
    }

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

                    <input className='loginBtn' type="button" value="LOGIN" onClick={authenticateAndLogin}/>

                </div>  
            </div>
        </div>
    )
}

export default LoginPage
