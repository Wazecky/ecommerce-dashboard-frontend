import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
function Protected(props) {
    // Extract the provided component from props
    let Cmp = props.Cmp
    // Access the navigation function from React Router
    const navigate = useNavigate()
    // Check user authentication status
    useEffect(() => {

        // If user info is not stored in localStorage, redirect to the registration pag 
        if (!localStorage.getItem('user-info')) {
            navigate("/register")
        }
    }, [])
    // Render the provided component if the user is authenticated
    return (
        <div>
            <Cmp />
        </div>
    )
}

export default Protected