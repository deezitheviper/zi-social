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
    email: "",
    city: "",
  })

  const handleChange = e => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value} ));
  }

  const upload = async (file) => {
    try{
      const formData = new FormData();
      formData.append("file", file);
      const res = await instance.post("/upload", formData);
      return res.data;
    }catch(e){
      console.log(e)
    }
  };

  const mutation = useMutation((user)=>{
    return instance.put('/users', user)
  },{
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  const handleUpdate= async e => {
    e.preventDefault();
    let avatarUrl = user.avatar;
    let coverUrl = user.cover;

    coverUrl = cover && await upload(cover)
    avatarUrl = avatar && await upload(avatar)
    mutation.mutate({...inputs, avatarUrl, coverUrl})
    
  }

  return (
    <div className='update'>
       Update
       <form>
        <input type="file" />
        <input type="file" />
        <input type="text" name="name" onChange={handleChange} />
        <input type="text" name="city" onChange={handleChange} />
       <button onClick={() => handleUpdate()}>Update</button>
      </form>
       <span onClick={() => openUpdate(false)}><AiOutlineClose/></span>
   
    </div>
  )
}

export default Update