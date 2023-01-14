
import "./styles/Share.scss";
import {BiImages} from "react-icons/bi";
import { useContext } from "react";
import {CiMapPin} from 'react-icons/ci';
import {FaUserFriends} from 'react-icons/fa';
import avatar from '../assets/img/avatar.png';
import { AuthContext } from "../context/AuthContext";


const Share = () => {
    
  const {currentUser} = useContext(AuthContext);
  const {username} = currentUser;

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={avatar}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ${username}?`} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} />
            <label htmlFor="file">
              <div className="item">
               <BiImages/>
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <CiMapPin />
              <span>Add Place</span>
            </div>
            <div className="item">
        
              <FaUserFriends/>
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;