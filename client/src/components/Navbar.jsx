import React from 'react';
import {IoHomeOutline} from 'react-icons/io5';
import {BsMoon,BsGrid1X2,BsSearch} from 'react-icons/bs';
import {CgProfile} from 'react-icons/cg';
import { Link } from 'react-router-dom';
import {HiOutlineMail} from 'react-icons/hi';
import {IoMdNotificationsOutline} from 'react-icons/io';
import avatar from '../assets/img/avatar.png';
import './styles/Navbar.scss';
import { useContext } from 'react';
import { DarkModeContext } from '../context/dmContext';
import {MdLightMode} from 'react-icons/md';


const Navbar = () => {
  const {toggle, darkMode} = useContext(DarkModeContext)

  return (
    <div className='navbar'>
      <div className="left">
        <Link to="/" style={{textDecoration:'none'}}>
          <span className='logo'>zi-social</span>
        </Link>
        <span><IoHomeOutline/></span>
        {darkMode?
        <span onClick={() => toggle()}><MdLightMode/></span>
        :<span onClick={() => toggle()}><BsMoon/></span>
        }
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
            <span>Deezi</span>
          </div>
      </div>

    </div>
  )
}

export default Navbar