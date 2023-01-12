import './Profile.scss';
import {CiMail} from 'react-icons/ci';
import avatar from "../../assets/img/avatar.png";
import Posts from '../../components/Posts';



const Profile = () => {
  return (
    <div className='profile'>
      <div className="header">
      <img src='https://images.unsplash.com/photo-1626276727721-e5fb4a008389?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjI3fHxzZXR1cHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60' className='cover'/>
        <img src={avatar} alt="" className="pavatar" /> 
      </div> 
        <div className="pContainer">
            <div className="pInfo">
            <span>Deezi TheViper</span>
                <div className="pDetails">
                    <CiMail/>
                </div>

            </div> 

            <Posts/>
        </div>
    </div>
  )
}

export default Profile