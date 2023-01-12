import React from 'react';
import Posts from '../../components/Posts';
import Reels from '../../components/Reels';
import './Home.scss';

const Home = () => {
  return (
    <div className='home'>
     <Reels/>
     <Posts/>
    </div>
  )
}

export default Home