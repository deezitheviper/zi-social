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
import {useQuery, QueryClient, useMutation} from "@tanstack/react-query";
import { instance } from '../axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const Post = ({post}) => {
    const {currentUser} = useContext(AuthContext);
    const [viewComment, setViewComment] = useState(false);
    const queryClient = new QueryClient();

    const { isLoading, error, data } = useQuery({
    queryKey:[`likes-${post.id}`],
    queryFn: () =>
    instance.get(`/likes/?postId=${post.id}`).then(
       res => {
        return res.data;
            }
        )
    })

    const mutation = useMutation( (liked) => {
        if(liked) return instance.delete(`/likes/${post.id}`);
        return instance.post('/likes/add', {postId:post.id});
       
    }, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: [`likes-${post.id}`] })
          },
    })
 

    const handleLike = () => {
        mutation.mutate(data.includes(currentUser.id))
    }

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
                    <span className='time'>{ post.createdOn? moment(post.createdOn).fromNow() : "1 min ago"}  </span>
                </div>
            </div>
            <BiDotsHorizontalRounded/>
        </div>
        <div className="content">
           <p>{post.content}</p>

 <img src={`../../public/uploads/${post.img}`} alt="" />

        </div>
        <div className="info">
            <div className="item">
            {isLoading?
            "loading.."
            :
            <>
             {data.includes(currentUser.id)?
            <MdOutlineFavorite onClick={handleLike} />
            :
            <MdOutlineFavoriteBorder onClick={handleLike}/>
             }
            </>
            }
            {data?.length}
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