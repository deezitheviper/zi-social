import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Auth.scss';


const Login = () => {
  return (
    <div className='bg'>
        <div className='bg-image'>
            <div className='bg-overlay'>
            <div className='auth'>
  
            <form>
                <input type="text" placeholder='Username' />
                <input type="password" placeholder='Password' />
                <button>Login</button>

                <p>Don't have an account? <Link to="/Register"> Register</Link></p>
            </form>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Login