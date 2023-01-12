import './styles/Post.scss';
import {BiDotsHorizontalRounded} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import avatar from '../assets/img/avatar.png';
import {MdOutlineFavoriteBorder,MdOutlineFavorite} from 'react-icons/md';
import {BiCommentDetail} from 'react-icons/bi';
import {AiOutlineShareAlt} from 'react-icons/ai';

const Post = ({post}) => {

  const liked = false;

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
                    <span className='time'> 1 min ago </span>
                </div>
            </div>
            <BiDotsHorizontalRounded/>
        </div>
        <div className="content">
           <p>{post.content}</p>
            <img src={post.img} alt="" />
        </div>
        <div className="info">
            <div className="item">
            {liked?
            <MdOutlineFavorite/>
            :
            <MdOutlineFavoriteBorder/>
            }
            0
            </div>
            <div className="item">
            <BiCommentDetail/>
            0 
            </div>

            <div className="item">
            <AiOutlineShareAlt />
            </div>
        </div>
        </div>
    </div>
  )
}

export default Post