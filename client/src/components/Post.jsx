import './styles/Post.scss';
import {BiDotsHorizontalRounded} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import avatar from '../assets/img/avatar.png';

const Post = ({post}) => {
  return (
    <div className='post'>
        <div className="container">
        <div className="user">
            <div className="userInfo">
                <img src={avatar} alt="" />
                <div className='details'>
                    <Link to={`/profile/${post.userId}`}>
                        <span className='name'>{post.name}</span>
                    </Link>
                    <span className='time'>1 min ago </span>
                </div>
            </div>
            <BiDotsHorizontalRounded/>
        </div>
        <div className="content">
<img src={post.img} alt="" />
        </div>
        <div className="info">

        </div>
        </div>
    </div>
  )
}

export default Post