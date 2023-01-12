import './styles/Comments.scss';
import avatar from '../assets/img/avatar.png';

const Comments = () => {
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

  return (
    <div className='comments'>
        <div className='write'>
        <img src={avatar} alt='' />
        <input type="text" placeholder="'I'm not ready', Life doesn't wait for you to be ready" />
       <button>Comment</button>
        </div>
        {
            comments.map(comment=> (
                <div className='comment'>
                <img src={comment.avatar} alt='' />
                <div className="info">
                <span>
                    {comment.name}
                </span>
                <p>{comment.content}</p>
                </div>
                <span className='time'>1 mins ago</span>
                </div>
            ))
        }
    </div>
  )
}

export default Comments