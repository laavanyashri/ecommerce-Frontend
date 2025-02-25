import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../config/firebase";
import signupimage from "../assests/navimage/signup.jpg"



function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [sucess, setSucess] = useState('');
    const navigate = useNavigate(); // Hook from React Router for navigation

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if ((password.length > 6) || (confirmPassword.length < 6)) {

            setError('Password length should be minimum of 6 charecters');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password).then((res) => {
            setError('');
            setSucess('Login details are saved succesfully!!!!!')
            console.log("the user response", res)
        }).catch((error) => {
            console.log("Failed to add user", error)

        })
        // Simulate user registration process
        console.log('User registered:', { email, password });
        // After registration, redirect to the login page
        navigate('/login'); // Replace '/login' with your login page route
    };
    return (
        <div className="m-auto  mt-8 w-[25vw] h-[100vh] bg-orange-300 z-10">
            <div className= "bg-white">
            <img src={signupimage} alt="cart" className="w-[90%] h-[90%] mix-blend-multiply"></img>
            </div>
         
            <form onSubmit={handleSubmit} className="p-10 rounded-lg " style={{ width: "100%" }}>
                <h2 className="text-3xl font-bold mb-5 text-gray-800">Sign Up</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {sucess && <p className="text-green-600 text-sm mt-2">{sucess}</p>}
                </div>
                <p className='text-blue-600 cursor-pointer my-2' onClick={() => navigate("/login")}> Already have an account? Login here</p>
                <button type="submit" className="bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-200 ease-in-out">
                    Register
                </button>
            </form>
        </div>
    )
}


export default SignUp
