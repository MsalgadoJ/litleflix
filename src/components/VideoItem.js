import React, { useState, useEffect } from 'react';
import ellipse from '../assests/images/ellipse.png';
import path from '../assests/images/path.png';
import '../styles/VideoItem.css';

const VideoItem = ({movie, url}) => {

  const [showMovie, setShowmovie] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShowmovie(true)
    }, 1000);
  },[])

  return (
    <div 
      className={`movie-container ${showMovie ? 'showMovie' : ''}`} key={movie.id} 
      style={{background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 22.78%, #000000 122.69%), url(${url}) no-repeat center/cover`}}
      >
        <h3 className='thumb-title'>{movie.title}</h3>
        <img src={ellipse} className="ellipse" alt="ellipse" />
        <img src={path} className="thumb-play" alt="path" />
    </div>
  )
};

export default VideoItem;
