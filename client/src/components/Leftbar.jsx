import React from 'react';
import './styles/Leftbar.scss';
import avatar from '../assets/img/avatar.png';
import {IoIosPeople} from 'react-icons/io';
import {TiGroup} from 'react-icons/ti';
import {TfiGallery} from 'react-icons/tfi';
import {TiMessages} from 'react-icons/ti';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';


const Leftbar = () => {
  const {currentUser} = useContext(AuthContext);
 

  return ( 
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={avatar} alt="" />
            <Link to={`/profile/${currentUser.username}`}>
                        <span className='name'>{currentUser.name}</span>
                    </Link>
          </div>
          <div className='item'>
          <IoIosPeople />
          <span>Connects</span>
          </div>
          <div className='item'>
          <TiGroup />
          <span>Groups</span>
          </div>
        </div>
        <hr/>
        <div className="menu">
        <span>Short Cuts</span>
          <div className='item'>
          <TfiGallery />
          <span>Gallery</span>
          </div>
          <div className='item'>
          <TiMessages />
          <span>Messages</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leftbar