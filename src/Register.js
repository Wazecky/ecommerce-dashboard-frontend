import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'

function Register() {
    // Check if user is already logged in when the component mounts
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/login")
        }
    }, [])

    // State variables to store user registration data
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    // Function to handle user registration
    async function signUp() {
        let item = { name, password, email }
        console.warn(item)

        // Send a POST request to the registration API
        let result = await fetch("http://localhost:8000/api/register", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        result = await result.json()

        // Store user info in localStorage
        localStorage.setItem("user-info", JSON.stringify(result))
        navigate("/login")

    }
    return (
        <>
            <Header />
            <div className="col-sm-6 offset-sm-3">
                <h1>Register Page</h1>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="name" /><br />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="email" /><br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="password" /><br />
                <button onClick={signUp} className="btn btn-primary">Sign Up</button>
            </div>
        </>
    )
}

export default Register