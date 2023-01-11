import { useContext } from 'react';
import { useState } from 'react';
import './styles/Reels.scss';
import avatar from '../assets/img/avatar.png';

const Reels = () => {

     const dz =    {
        id:5,
        name: 'Deezi',
        img: 'https://images.unsplash.com/photo-1579572331145-5e53b299c64e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8SG9vZGllfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
    }
    const tempReels = [
    {
        id:1,
        name: 'Deezi',
        img: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
        id:2,
        name: 'The Viper',
        img: 'https://images.unsplash.com/photo-1588017316637-7e04d6e81ed1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
    },
    {
        id:3,
        name: 'Car Freak',
        img: 'https://images.unsplash.com/photo-1609386464913-4cbfa39de540?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
        id:4,
        name: 'Untamed',
        img: 'https://images.unsplash.com/photo-1598079253422-638fa9b2d160?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    }
    ];

  return (
    <div className="reels">
            <div className="reel">
             <img className='realImg'  src={dz.img} alt='' />
             <div className="user">
                   <img src={avatar} alt="" />    
                   <span>Deezi</span>
            </div>
           </div>
        {
            tempReels.map(reel => (
            <div className="reel">
             <img className='realImg' src={reel.img} alt='' />
            
             <div className="user">
                   <img src={avatar} alt="" />    
                   <span>{reel.name}</span>
            </div>
           </div>
            )
            )
        }
         </div>
    )
}

export default Reels;