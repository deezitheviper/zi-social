import React from 'react';
import './styles/Register.scss';

const Register = () => {
  return (
    <div className='bg'>
    <div className='bg-image'>
        <div className='bg-overlay'>
        <div className='register'>
       
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

export default Register