import React from 'react'
import "./LoginForm.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const LoginForm = () => {
  return (
    <div className='wrapper'>
        <form action="">
            <h1>Login</h1>
            <div className='input-box'>
                <input type="text" placeholder='Username' required></input>
                <FaUser className='icon' />
            </div>
            <div className='input-box'>
                <input type="password" placeholder='Password' required></input>
                <FaLock className='icon' />
            </div>
            <div className='rembember-forgot'>
                <label><input type='checkbox'/>Remember me</label>
                <a href="#">Forgot password?</a>
            </div>
            <button type='submit'>Login</button>
           
        </form>
    </div>
  )
}

export default LoginForm
