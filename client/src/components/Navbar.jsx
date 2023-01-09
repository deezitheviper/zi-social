import React from 'react';
import {IoHomeOutline} from 'react-icons/io5';
import {BsMoon,BsGrid1X2,BsSearch} from 'react-icons/bs';
import {CgProfile} from 'react-icons/cg';
import { Link } from 'react-router-dom';
import {HiOutlineMail} from 'react-icons/hi';
import {IoMdNotificationsOutline} from 'react-icons/io';
import avatar from '../assets/img/avatar.png';
import './styles/Navbar.scss';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="left">
        <Link to="/" style={{textDecoration:'none'}}>
          <span>zi-social</span>
        </Link>
        <span><IoHomeOutline/></span>
        <span><BsMoon/></span>
        <span><BsGrid1X2/></span>
        <div className='search'>
          <input type="text" placeholder='Search...' />
          <BsSearch/>
        </div>
      </div>

      <div className="right">
           <span><CgProfile/></span>
           <span><HiOutlineMail/></span>
           <span><IoMdNotificationsOutline/></span>

          <div className="profile">
            <img src={avatar} alt="" />
            <span>John Doe</span>
          </div>
      </div>

    </div>
  )
}

export default Navbar