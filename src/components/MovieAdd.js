import React, { useState, useEffect } from 'react';
import { storage } from '../firebase/index';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from '@firebase/storage';
import DragAndDrop from './DragAndDrop';
import '../styles/MovieAdd.css';
import ProgressBar from './ProgressBar';

import Fade from 'react-reveal/Fade';


const MovieAdd = () => {

  const [name, setName] = useState('');
  const [selectedImg, setSelectedimg] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [imgUrl, setImgurl] = useState('');
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem("movies");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [movie, setMovie] = useState({
    name:'',
    url: ''});
  
  const [progress, setProgress] = useState(0);

  const [upload, setUpload] = useState(false)

  const formHandler = (e) => {
    e.preventDefault();
    const image = selectedImg;
    uploadImg(image);
    setUpload(true)
  };

  const uploadImg = (image) => {
    if (!image) return;
    const storageGet = getStorage();
    const storageRef = ref(storageGet, `images/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on(
      "state_changed", 
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        console.log(prog)
        setProgress(prog)
      }, 
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then(url => {
          console.log(url)
          setImgurl(url)
        })
      }
    );
  };

  // avoid adding an empty object to the array
  useEffect(()=> {
    console.log('nombre: ', name)
    setMovie({name:name, url: imgUrl})
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
      <Fade bottom><h1>AGREGAR PELÍCULA</h1></Fade>
      

      <form action="" onSubmit={formHandler} style={{display: !upload ? 'block' : 'none'}}>
        <DragAndDrop 
          onSelectedImgChange={setSelectedimg} onRejected={setRejected}/>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <button type="submit" >SUBIR PELÍCULA</button>
      </form>
      <h3>Uplodad {progress} %</h3>
      {/* {upload ? <ProgressBar /> : null} */}
      <ProgressBar errors={rejected} />
    </div>
  )
}

export default MovieAdd;

