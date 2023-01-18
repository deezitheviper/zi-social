import React, { useState } from 'react';
import "./styles/Update.scss";
import {AiOutlineClose} from "react-icons/ai";
import { instance } from '../axios';
import {useMutation, QueryClient } from "@tanstack/react-query";

const Update = ({openUpdate,user}) => {

  const queryClient = new QueryClient();

  const [avatar, setAvatar] = useState();
  const [cover, setCover] = useState();
  const [inputs, setInputs] = useState({
    name: "",
    city: "",
  })
  const [isReady, setIsReady] = useState(false); 

  const handleChange = e => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value} ));
  }

  const upload = async (file) => {
    try{
      const formData = new FormData();
      formData.append("img", file);
      const res = await instance.post("/upload", formData);
      return res.data;
    }catch(e){
      console.log(e)
    }
  };

  const mutation = useMutation((user)=>{
    return instance.put('/users/', user)
  },{
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user', isReady] })
    },
  })

  const handleUpdate= async e => {
    e.preventDefault();
    let avatarUrl;
    let coverUrl;

    coverUrl = cover && await upload(cover)
    avatarUrl = avatar && await upload(avatar)
    mutation.mutate({...inputs, avatarUrl, coverUrl})
    setIsReady(!isReady)
    openUpdate(false)
  }

  return (
    <div className='update'>
       Update
       <form>
        <input type="file" onChange={e => setCover(e.target.files[0])} />
        <input type="file" onChange={e => setAvatar(e.target.files[0])} />
        <input type="text" name="name" onChange={handleChange} />
        <input type="text" name="city" onChange={handleChange} />
       <button onClick={e => handleUpdate(e)}>Update</button>
      </form>
       <span onClick={() => openUpdate(false)}><AiOutlineClose/></span>
   
    </div>
  )
}

export default Update