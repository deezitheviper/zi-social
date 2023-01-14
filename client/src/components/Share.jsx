import "./styles/Share.scss";
import {BiImages} from "react-icons/bi";
import { useContext, useState } from "react";
import {CiMapPin} from 'react-icons/ci';
import {FaUserFriends} from 'react-icons/fa';
import avatar from '../assets/img/avatar.png';
import { AuthContext } from "../context/AuthContext";
import {useMutation, QueryClient } from "@tanstack/react-query";
import { instance } from "../axios";


const Share = () => {
    
  const {currentUser} = useContext(AuthContext);
  const {username} = currentUser;
  const [img, setFile] = useState(null);
  const [content, setContent] = useState();

  const queryClient = new QueryClient();

  const upload = async () => {
    try{
      const formData = new FormData();
      formData.append("img",img)
      const res = await instance.post('/upload', formData);
      return res.data;
    }catch(e){
      console.error(e)
    }
  }

  const mutation = useMutation((newPost)=>{
    return instance.post('/posts/add', newPost)
  },{
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

const handleShare = async e => {
  e.preventDefault();
  let imgUrl = "";
  if(img) imgUrl = await upload()
  mutation.mutate({content,imgUrl})
}

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
          <img
            src={avatar}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ${username}?`} onChange={e => setContent(e.target.value)} />
          </div>
          <div className="right">
            {img && <img className="file" alt="" src={URL.createObjectURL(img)} />}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={e => setFile(e.target.files[0])} />
            <label htmlFor="file">
              <div className="item">
               <BiImages/>
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <CiMapPin />
              <span>Add Place</span>
            </div>
            <div className="item">
        
              <FaUserFriends/>
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">

            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;