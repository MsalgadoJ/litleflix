import React, { useState, useEffect } from 'react';
import path from '../assests/images/path.png';
import playbg from '../assests/images/playbg.png';
import star from '../assests/images/Star.png';
import '../styles/VideoItem.css';

const VideoItem = ({movie, url, showInfo = false}) => {

  const [showMovie, setShowmovie] = useState(false)
  const [showMask, setShowmask] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowmovie(true)
    }, 300);
  },[])


  // Toggle hover mask
  let enter = 0;
  const onMouseMask = () => {
    if(showMask===false && enter !== 1) {
      enter=1
      setShowmask(true)
    }
    return enter;
  }

  const onMouseOutMask = () => {
    if(showMask && enter !== 2) {
      enter=2
      setShowmask(false)
    }
    return enter;
  }

  return (
    <div 
      className={`movie-container ${showMovie ? 'showMovie' : ''}  `} 
      key={movie.title} 
      style={{background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 22.78%, #000000 122.69%), url(${url}) no-repeat center/cover` }}
      onMouseOver={onMouseMask}
      onMouseOut={onMouseOutMask}
      >
        <div 
          className={`thumb-wrapper ${!showMask ? '' : 'bgMask'}`}
        >
            <div className={`movie-content-one ${!showMask ? '' : 'hide-one'}`}>
              <div className="icons-container">
                  <div className="circle">
                    <img src={path} className="thumb-play" alt="path" />
                  </div>
                </div>
                <div className='thumb-title-container'>
                  <h3 className='thumb-title'>{movie.title}</h3>
                </div>
            </div>

            <div className={`movie-content-two ${!showMask ? '' : 'show-two'}`}>
              <div className="icon-and-title-container">
                  <div className="icons-container margined">
                    <div className="circle small">
                      <img src={playbg} className="thumb-play small-play" alt="path" />
                    </div>
                  </div>
                  <h3 className="thumb-title mask">{movie.title}</h3>
                </div>
                {/* toggle the bottom info for custom movies*/}
                {showInfo ? 
                  (
                    <div className="thumb-info-container">
                      <div className="rate-container">
                        <img src={star} className="thumb-star" alt="star" title="star" />
                        <p className='rate-text'>{movie.vote_average}</p>
                      </div>
                      <div className="year-container">
                        <p className="year-text">{movie.release_date.slice(0,4)}</p>
                      </div>
                    </div>
                  ) 
                  : null
                }
                
            </div>
        </div>
    </div>
  )
};

export default VideoItem;
