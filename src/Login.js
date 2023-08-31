import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
function Login() {
    // State variables to store user input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/")
        }
    }, [])

    // Function to handle user login
    async function login() {
        console.warn(email, password)
        let item = { email, password }

        // Send a POST request to the login API
        let result = await fetch("http://localhost:8000/api/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify(item)
        });
        result = await result.json()

        // Store user info in localStorage
        localStorage.setItem("user-info", JSON.stringify(result))
        navigate("/")
    }
    return (
        <div>
            <Header />

            <h1>Login Page</h1>
            <div className='col-sm-6 offset-sm-3'>
                <input type="text" placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className='form-control' />  <br />
                <input type="password" placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className='form-control' />  <br />
                <button onClick={login} className='btn btn-primary'>Login</button>
            </div>
        </div>
    )
}

export default Login