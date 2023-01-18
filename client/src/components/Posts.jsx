import './styles/Posts.scss';
import avatar from '../assets/img/avatar.png';
import Post from './Post';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../axios';

const Posts = ({userId}) => {

  const { isLoading, error, data } = useQuery({
    queryKey: ['posts', userId],
    queryFn: () =>
    
    instance.get(`/posts/?userId=${userId}`).then(
       res => { 
        return res.data;
       }
      )
  })

  return (
    <div className="posts">

        {
            data?.map(post => (
               <Post post={post} key={post.id} />
            ))
        }
    </div>
  )
}

export default Posts