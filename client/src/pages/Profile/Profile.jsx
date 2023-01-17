import './Profile.scss';
import {CiMail} from 'react-icons/ci';
import avatar from "../../assets/img/avatar.png";
import Posts from '../../components/Posts';
import { useParams } from 'react-router-dom';
import {useQuery, QueryClient, useMutation} from "@tanstack/react-query";
import { instance } from '../../axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import { useState } from 'react';
import { useEffect } from 'react';


const Profile = () => {
  const {currentUser} = useContext(AuthContext);
  const {id} = useParams();

  const queryClient = new QueryClient();
  const [isReady, setIsReady] = useState(false); 

  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
    instance.get(`/users/${id}`,).then(res => {
      return res.data
    })   
  })

  const { isLoading:rLoading, data:relationshipData } = useQuery({
    queryKey: ["relationship",[data?.id,isReady]],
    queryFn: () =>
    instance.get(`/relationships/?followed=${data?.id}`).then(res => {
      return res.data
    })   
  })

  const mutation = useMutation( (following) => {
   
    if(following) return instance.delete(`/relationships/?userId=${data?.id}`).then(setIsReady(!isReady));
    return instance.post(`/relationships/`,{userId:data.id}).then(setIsReady(!isReady));
}, {
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["relationship",isReady] })
      },
})  

const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id))
}

  return (
    <div className='profile'>
      <div className="header">
      <img src='https://images.unsplash.com/photo-1626276727721-e5fb4a008389?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjI3fHxzZXR1cHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60' className='cover'/>
        <img src={avatar} alt="" className="pavatar" /> 
      </div> 
        <div className="pContainer">
            <div className="pInfo">
            <span>{data?.name}</span>
                <div className="pDetails">
                  <a className='icon' href='mailto:deezitheviper@gmail.com' >
                    <CiMail fontSize={30}/>
                    </a>
                  
                    {rLoading?
                    <AiOutlineLoading3Quarters/>
                    :
                    currentUser.username == id?
                    <button className='follow'>
                      update
                    </button>
                    :
                    (
                     
                      relationshipData?.includes(currentUser.id)?
                      <button  onClick={handleFollow} className='unfollow'>
                      unFollow
                    </button>
                    :
                    <button onClick={handleFollow} className='follow'>
                    Follow
                  </button>
                    )
}
                </div>

            </div> 

            <Posts userId={data?.id}/>
        </div>
    </div>
  )
}

export default Profile