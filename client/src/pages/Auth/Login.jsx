import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './styles/Auth.scss';


const Login = () => {
  const {login } = useContext(AuthContext)
  return (
    <div className='bg'>
        <div className='bg-image'>
            <div className='bg-overlay'>
            <div className='auth'>
  
            <form>
                <input type="text" placeholder='Username' />
                <input type="password" placeholder='Password' />
                <button onClick={() => login()}>Login</button>

                <p>Don't have an account? <Link to="/Register"> Register</Link></p>
            </form>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Login