import './Profile.scss';
import {CiMail} from 'react-icons/ci';
import avatar from "../../assets/img/avatar.png";
import Posts from '../../components/Posts';
import { useParams } from 'react-router-dom';
import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import { instance } from '../../axios';


const Profile = () => {

  const {id} = useParams();


  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
    instance.get(`/users/${id}`,).then(res => {
      return res.data
    })   
  })




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
                </div>

            </div> 

            <Posts/>
        </div>
    </div>
  )
}

export default Profile