import './styles/Post.scss';
import {BiDotsHorizontalRounded} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import avatar from '../assets/img/avatar.png';
import {MdOutlineFavoriteBorder,MdOutlineFavorite} from 'react-icons/md';
import {BiCommentDetail} from 'react-icons/bi';
import {AiOutlineShareAlt} from 'react-icons/ai';
import { useState } from 'react';
import Comments from './Comments';
import moment from 'moment';


const Post = ({post}) => {

  const [viewComment, setViewComment] = useState(false);

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
                    <span className='time'>{post.createdOn? moment(post.createdOn).fromNow() : "1 min ago"}  </span>
                </div>
            </div>
            <BiDotsHorizontalRounded/>
        </div>
        <div className="content">
           <p>{post.content}</p>
           {post.img.Contains("https") ?
 <img src={post.img} alt="" />
 :
 <img src={`../../public/uploads/${post.img}`} alt="" />
           }
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
            <BiCommentDetail onClick={() => setViewComment(!viewComment)}/>
            0 
            </div>

            <div className="item">
            <AiOutlineShareAlt />
            </div>
        </div>

        {viewComment && 
        (
            <Comments postId={post.id}/>
        )
        }
        </div>
    </div>
  )
}

export default Post