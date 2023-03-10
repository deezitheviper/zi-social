import './styles/Comments.scss';
import avatar from '../assets/img/avatar.png';
import {useQuery} from '@tanstack/react-query';
import { instance } from '../axios';
import moment from 'moment';
import {useMutation, QueryClient } from "@tanstack/react-query";
import { useState } from 'react';

const Comments = ({postId}) => {
    const [comment, addComment] = useState();
    const [isReady, setIsReady] = useState(false)
     
  const comments = [
    {
        id:1,
        name: 'Dave',
        userId: 2,
        avatar: avatar,
        content: 'A new week, a new day, another oppurtunity to be worldclass',
    },
{
    id:2,
    name: 'Samuel',
    userId: 1,
    avatar: avatar,
    content: 'Light up the world, the face of illussion and the view of deception',
},
{
    id:3,
    name: 'Sarah',
    userId: 4,
    avatar: avatar,
    content: "I'm not yet ready, Life doesn't wait for you to be ready",
}
  ]

  const queryClient = new QueryClient();

  const mutation = useMutation((newComment)=>{
    return instance.post('/comments/add', newComment).then( res => {
      setIsReady(!isReady)
      addComment("")
    }
    )
  },{
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [`comments-${postId}`, isReady] })
    },
  })


  const { isLoading, error, data } = useQuery({
    queryKey: [`comments-${postId}`, isReady],
    queryFn: () =>
    
    instance.get(`/comments/?postId=${postId}`).then(
       res => {
        console.log(res.data)
        return res.data;
       }
      )
      
  })

  const postComment =  e => {
    e.preventDefault();
    mutation.mutate({comment,postId})
  }


  return (
    <div className='comments'>
        <div className='write'>
        <img src={avatar} alt='' />
        <input type="text" placeholder="'I'm not yet ready', Life doesn't wait for you to be ready" onChange={e => addComment(e.target.value) } />
       <button onClick={postComment} >Comment</button>
        </div>
        {isLoading?
        "Loading..."
           : 
           data?.map(comment=> (
                <div className='comment'>
                <img src={comment.avatar} alt='' />
                <div className="info">
                <span>
                    {comment.name}
                </span>
                <p>{comment.content}</p>
                </div>
                <span className='time'>{moment(comment.createdOn).fromNow()}</span>
                </div>
            ))
        }
    </div>
  )
}

export default Comments