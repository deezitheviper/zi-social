import React from 'react';
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
            </form>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Login