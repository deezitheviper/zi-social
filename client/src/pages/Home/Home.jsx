import React from 'react';
import Posts from '../../components/Posts';
import Reels from '../../components/Reels';
import Share from '../../components/Share';
import './Home.scss';

const Home = () => {
  return (
    <div className='home'>
     <Reels/>
     <Share/>
     <Posts/>
    </div>
  )
}

export default Home