import React from 'react';
import './styles/Auth.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:"",
    name:"",
  })
  
  const [err, setErr] = useState(false)

  const handleChange = e => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    console.log(inputs)
  }

  const register = async e => {
    e.preventDefault();

    try{
        await axios.post("http://localhost:8000/api/v1/auth/register", inputs)
    }catch(err){
      setErr(err.response.data) 
      console.log(err.response.data)
    }
  } 

  return (
    <div className='bg'>
    <div className='bg-image'>
        <div className='bg-overlay'>
        <div className='auth'>
       
        <form>
        {err && <p className='error'>{err}</p>}<br/>
            <input type="text" placeholder='Username' name='username' onChange={handleChange} />
            <input type="text" placeholder='Email'  name='email' onChange={handleChange} />
            <input type="text" placeholder='Name' name='name' onChange={handleChange} />
            <input type="password" placeholder='Password'  name='password' onChange={handleChange} />
            <button onClick={e => register(e)}>Register</button>
            <p>Have an account? <Link to="/Login"> Login</Link></p>
        </form>

    </div>
    </div>
    </div>
</div>
  )
}

export default Register