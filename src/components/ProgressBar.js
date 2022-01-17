import React, { useState, useEffect } from 'react';
import '../styles/ProgressBar.css';

const ProgressBar = (props) => {
  const {errors, onUploadChange, onProgressChange} = props;

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
      onProgressChange(progress)
    }
  }, [progress])

  const retryBtn = () => {
    onUploadChange(false)
    onProgressChange(0)
  }

  const lodingDisplayText = () => {
    if(progress > 0 && progress < 90) {
      return <h3 className='progress-text'>CARGANDO <strong>{progress}%</strong></h3>
    } else if ( progress === 100 && errors.length > 0) {
      return (
        <h3 className='progress-text'><strong>¡ERROR!</strong> NO SE PUDO CARGAR LA PELÍCULA</h3>
        )
    } else if ( progress === 100 && errors.length === 0) {
      return <h3 className='progress-text'>100% CARGADO</h3>
    } 
  }

  const cancelDisplayText = () => {
    if(progress > 0 && progress < 90) {
      return <h3 className='progress-text'>CANCELAR</h3>
    } else if ( progress === 100 && errors.length > 0) {
      return <button className='btn-back' onClick={retryBtn}>REINTENTAR</button>
    } else if ( progress === 100 && errors.length === 0) {
      return <h3 className='progress-text'>¡LISTO!</h3>
    } 
  }

  return (
    <div className='progress-bar-container'>
        {progress > 0 ?
        lodingDisplayText()
        :
        <h3 className='progress-text'>CARGANDO</h3>
        }
        <div className="progress-bar">
          <div className="progress-bar-track">
            <div className={`progress-filler ${errors.length > 0 && progress === 100 ? 'error' : ''}`} style={{width: progress > 0 ? '100%' : 0 }}>
            </div>
          </div>
        </div>  
        {progress > 0 ?
        cancelDisplayText()
        :
        <h3 className='progress-text'>CANCELAR</h3>
        }
    </div>
  )
}

export default ProgressBar;
