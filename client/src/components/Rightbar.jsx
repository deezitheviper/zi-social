import React from 'react';
import './styles/Rightbar.scss';
import avatar from '../assets/img/avatar.png';



const Rightbar = () => {
  return (
    <div className='rightbar'>
      <div className='container'>
      <div className='item'>
        <span>Friends you may know</span>
        <div className='user'>
        <div className='userInfo'>
          <img src={avatar} alt="" />
          <span>The Viper</span>
        </div>
        <div className="buttons">
          <button>Follow</button>
        </div>
        </div>
        <div className='user'>
        <div className='userInfo'>
          <img src={avatar} alt="" />
          <span>The Viper</span>
        </div>
        <div className="buttons">
          <button>Follow</button>
        </div>
        </div>
        </div>

        <div className="item">
        <span>Recent Activities</span>
        <div className='user'>
        <div className='userInfo'>
          <img src={avatar} alt="" />
          <p>
          <span>The Viper</span><br/>
          Shared a new post
          </p>
        </div>
        <span className='time'>1 min ago</span>
        </div>
        <div className='user'>
        <div className='userInfo'>
          <img src={avatar} alt="" />
          <p>
          <span>The Viper</span><br/>
          Changed his profile picture
          </p>
        </div>
        <span className='time'>1 min ago</span>
        </div>
        </div>
   

        <div className="item">
        <span>Online Friends</span>
        <div className='user'>
        <div className='userInfo'>
          <div className="online" />
          <img src={avatar} alt="" />
          <span>The Viper</span>
        </div>
        <div className="buttons">
          <button>Message</button>
        </div>
        </div>
        <div className='user'>
        <div className='userInfo'>
          <img src={avatar} alt="" />
          <span>The Viper</span>
        </div>
        <div className="buttons">
          <button>Message</button>
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Rightbar