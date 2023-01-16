import './styles/Posts.scss';
import avatar from '../assets/img/avatar.png';
import Post from './Post';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../axios';

const Posts = () => {
  const posts = [
    {
        id:1,
        name: 'Dave',
        userId: 2,
        avatar: avatar,
        img: 'https://images.unsplash.com/photo-1673468199846-fb5572dfb862?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
        content: 'A new week, a new day, another oppurtunity to be worldclass',
    },
{
    id:2,
    name: 'Samuel',
    userId: 1,
    avatar: avatar,
    img: 'https://images.unsplash.com/photo-1673379324638-1b0cc40f4bbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
    content: 'Light up the world, the face of illussion and the view of deception',
},
{
    id:3,
    name: 'Sarah',
    userId: 4,
    avatar: avatar,
    img: 'https://images.unsplash.com/photo-1673199187043-70078b38dac7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    content: "'I'm not yet ready', Life doesn't wait for you to be ready",
}
  ]

  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
    instance.get("/posts/").then(
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