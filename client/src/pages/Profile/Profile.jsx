import './Profile.scss';
import {CiMail} from 'react-icons/ci';
import avatar from "../../assets/img/avatar.png";

const Profile = () => {
  return (
    <div className='profile'>
      
        <img src={avatar} alt="" className="avatar" />
        <div className="container">
            <div className="userInfo">
            <span>Deezi TheViper</span>
                <div className="details">
                    <CiMail/>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Profile