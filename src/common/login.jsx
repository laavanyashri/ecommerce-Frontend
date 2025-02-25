import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from "../config/firebase"
import { setLogLevel } from 'firebase/app';
import loginimage from "../assests/navimage/login.jpg";


function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setError] = useState('')
    //restore the scroll bar on top
    useEffect(() => {
        window.scrollTo(0, 0);

        auth.onAuthStateChanged(function (user) {
            console.log("the logi inuser",user)
            if (user) {
                navigate("/home")
            }
            else{
               // navigate("/login")
            }
        })
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password).then((res) => {
            
        console.log('User logged in:', { email, password });
            navigate('/home');
        }).catch(() => {
            setError("Error Signing in please try agin")

            console.log("Error Signing in please try agin")
        })
        // Simulate login process


    };
    return (
             <div className="m-auto mt-8 w-[30vw] h-[80vh] bg-orange-300 z-10">

            <div className=" bg-white">
                <img src={loginimage} alt="cart" className=" w-[25vw]  m-auto mix-blend-multiply"></img>
            </div>
                <form onSubmit={handleLogin}>
                    <h2 className='font-extrabold text-3xl text-center'>Login</h2>
                    <br></br>
                    <div className="mb-4 flex justify-around items-center ml-4">
                        <label className=" text-gray-700 block">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 p-2 w-[25vw] border rounded"
                        />
                    </div>
                    <div className="mb-4 flex justify-around items-center">
                        <label className="block text-gray-700 ">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 p-2 w-[25vw] border rounded"
                        />
                    </div>
                    <p className='text-red-600 cursor-pointer my-2'>{err}</p>
                    <div className='mx-10 my-10'>
                        <p className='text-blue-600 cursor-pointer my-2' onClick={() => navigate("/signup")}>New user? Register here</p>

                        <p>By Continuing,I agree to the <span className='text-red-400'>Terms of  Use </span>& <span className='text-red-400'>Privacy Policy</span></p>
                        <br></br>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out">
                            Login
                        </button>
                    </div>
                </form>
            </div>
       
    )

}

export default Login