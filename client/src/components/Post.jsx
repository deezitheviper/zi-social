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
import {AiOutlineLoading3Quarters,AiFillDelete} from 'react-icons/ai'




const Post = ({post}) => {
    const {currentUser} = useContext(AuthContext);
    const [viewComment, setViewComment] = useState(false);
    const queryClient = new QueryClient();
    const [isReady, setIsReady] = useState(false)
    const [menu, setMenu] = useState(false)
    const { isLoading, error, data } = useQuery({
    queryKey:[`likes-${post.id}`, isReady],
    queryFn: () =>
    instance.get(`/likes/?postId=${post.id}`).then(
       res => {
        return res.data;
            }
        )
    })

    const mutation = useMutation( (liked) => {
        if(liked) return instance.delete(`/likes/${post.id}`).then(setIsReady(!isReady));
        return instance.post('/likes/add', {postId:post.id}).then(setIsReady(!isReady));
    }, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: [`likes-${post.id}`, isReady] })
          },
    })

    const deleteMutation = useMutation( (postId) => {
        return instance.delete(`/posts/${postId}`).then(setIsReady(!isReady));
    }, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["posts"] })
          },
    })
 
    const handleLike = () => {
        mutation.mutate(data.includes(currentUser.id))
    }

    const handleDelete = () => {

    }
  return (
    <div className='post'>
        <div className="container">
        <div className="user">
            <div className="userInfo">
                <img src={avatar} alt="" />
                <div className='details'>
                    <Link to={`/profile/${post.username}`}>
                        <span className='name'>{post.name}</span>
                    </Link>
                    <span className='time'>{ post.createdOn? moment(post.createdOn).fromNow() : "1 min ago"}  </span>
                </div> 
            </div>
            {!menu && (<BiDotsHorizontalRounded onClick={() => setMenu(!menu)} />)}
            {menu && <AiFillDelete onClick={handleDelete}/>}
        </div>
        <div className="content">
           <p>{post.content}</p>

 <img src={`../../public/uploads/${post.img}`} alt="" />

        </div>
        <div className="info">
            <div className="item">
            {isLoading?
            <AiOutlineLoading3Quarters/>
            :
            
            data?.includes(currentUser.id)?
            <MdOutlineFavorite onClick={handleLike} />
            :
            <MdOutlineFavoriteBorder onClick={handleLike}/>
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