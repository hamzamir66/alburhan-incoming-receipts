import React, { useState, useEffect } from "react";
import axios from "axios";      
import './styles/loginForm.css';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(()=>{
        console.log(email);
    }, [email])

    useEffect(()=>{
        console.log(password);
    }, [password])

    const handleSubmit = (e) => {
        console.log('button clicked');
        e.preventDefault();
        axios
            .post("http://127.0.0.1:5500/api/v1/login", { email, password })
            .then((response) => {
                if (response.status === 200) {
                    // login successful
                } else {
                    console.log(response);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-label">
                Email:
                <input
                    className="login-input"
                    type="email"
                    value={email}
                    required="required"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <br />
            <label className="login-label">
                Password:
                <input
                    className="login-input"
                    type="password"
                    value={password}
                    required="required"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <br />
            <button className="login-button" type="submit">Login</button>
        </form>
    );
}

export default LoginForm;