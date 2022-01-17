import React, { useState, useEffect } from 'react';
import { storage } from '../firebase/index'
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from '@firebase/storage';
import DragAndDrop from './DragAndDrop';
import '../styles/MovieAdd.css';
import ProgressBar from './ProgressBar';


const MovieAdd = () => {

  const [title, setTitle] = useState('');
  const [selectedImg, setSelectedimg] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [imgUrl, setImgurl] = useState('');
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem("movies");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [movie, setMovie] = useState({
    title:'',
    url: ''});

  const [upload, setUpload] = useState(false)
  const [checkProgress, setCheckProgress] = useState(0);

  const formHandler = (e) => {
    e.preventDefault();
    const image = selectedImg;
    uploadImg(image);
    setUpload(true)
  };

  const uploadImg = (image) => {
    if (!image) return;
    const storageGet = getStorage();
    const storageRef = ref(storageGet, `images/${image.title}`)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on(
      "state_changed", 
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        console.log(prog)
      }, 
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then(url => {
          setImgurl(url)
        })
      }
    );
  };

  // avoid adding an empty object to the array
  useEffect(()=> {
    console.log('nombre: ', title)
    setMovie({title:title, url: imgUrl})
  },[imgUrl])

  useEffect(()=> {
    console.log(movie)
    if(imgUrl !== '') {
      setMovies([...movies, movie])
    }
  },[movie])
  
  useEffect(()=> {
    console.log(movies)
    localStorage.setItem("movies", JSON.stringify(movies))
  },[movies])

  return (
    <div className='add-movie-container'>
      <div className="wrapper">
      {checkProgress === 100 && rejected.length === 0 ? (<>
        <h1 className='ty-title'><strong>LITE</strong>FLIX</h1>
        <h2 className='ty-subtitle'>¡FELICITACIONES!</h2> 
        <h3 className='ty-description'>{title} FUE CORRECTAMENTE SUBIDA</h3>
        <a href="/" className='ty-redirect'>IR A HOME</a>

      </>
      )
      : 
      (
      <>
      <h1 className='movie-container-title'>AGREGAR PELÍCULA</h1> 
      <form 
      action=""
      className='add-movie-form'
      onSubmit={formHandler} 
      >
        {upload ? 
          <ProgressBar 
            errors={rejected} 
            onUploadChange={setUpload} 
            onProgressChange={setCheckProgress} /> :
          <DragAndDrop 
          onSelectedImgChange={setSelectedimg} 
          onRejected={setRejected}
          />
        }
        <div className="form-group">
          <input 
            type="text"
            className='input-title'
            placeholder='TITULO' 
            value={title.toUpperCase()} 
            onChange={e => setTitle(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <button type="submit" className='btn-upload'>SUBIR PELÍCULA</button>
        </div>
      </form>
      </>
      )
      }
      </div>
    </div>
  )
}

export default MovieAdd;

