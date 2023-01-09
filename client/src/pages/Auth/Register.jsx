import React from 'react';
import './styles/Auth.scss';

const Register = () => {
  return (
    <div className='bg'>
    <div className='bg-image'>
        <div className='bg-overlay'>
        <div className='auth'>
       
        <form>
            <input type="text" placeholder='Username' />
            <input type="text" placeholder='Email' />
            <input type="password" placeholder='Password' />
            <input type="text" placeholder='Confirm Password' />
            <button>Register</button>
        </form>

    </div>
    </div>
    </div>
</div>
  )
}

export default Register