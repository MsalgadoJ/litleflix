import React, { useState, useEffect } from 'react';
import '../styles/ProgressBar.css';

const ProgressBar = (props) => {
  const {errors} = props;

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let percentage = 0
    let interval;
    if(!loading) {
      interval = setInterval(() => {
        setProgress(percentage+=20)
      }, 900);
    }
    return () =>{ 
      console.log('clear interval')
      clearInterval(interval)
    };
  }, [loading]);

  useEffect(() => {
    if(progress === 100) {
      setLoading(true)
    }
  }, [progress])

  return (
    <div className='progress-bar-container'>
      <h3 className='progress-text'>CARGANDO {progress}%</h3>
        <div className="progress-bar">
          <div className="progress-bar-track">
            <div className={`progress-filler ${loading ? 'error' : ''}`} style={{width: progress > 0 ? '100%' : 0 }}>

            </div>
          </div>
        </div>  
      <h3 className='progress-text'>CANCELAR</h3>
    </div>
  )
}

export default ProgressBar;
