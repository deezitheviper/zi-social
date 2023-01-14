import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './styles/Auth.scss';


const Login = () => {
  const {login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
      username:"",
      password:"",
  })
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleChange = e => {
    setInputs( data => ({...data, [e.target.name]:e.target.value}));
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      await login(inputs);
      navigate("/")
    }catch(err){
      setErr(err.response.data)
    }
  };

  return (
    <div className='bg'>
        <div className='bg-image'>
            <div className='bg-overlay'>
            <div className='auth'>
  
            <form>
            {err && <p className='error'>{err}</p>}<br/>
                <input 
                type="text" 
                placeholder='Username' 
                name='username' 
                onChange={handleChange}
                />
                <input 
                type="password" 
                placeholder='Password' 
                name='password' 
                onChange={handleChange} 
                />
                <button onClick={handleLogin}>Login</button>

                <p>Don't have an account? <Link to="/Register"> Register</Link></p>
            </form>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Login