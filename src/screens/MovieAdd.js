import React, { useState, useEffect } from 'react';
import { storage } from '../firebase/index';
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  getStorage 
} from '@firebase/storage';
import DragAndDrop from '../components/DragAndDrop';
import '../styles/MovieAdd.css';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import { Fade } from "react-awesome-reveal";


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
    id:'',
    title:'',
    url: ''});

  const [upload, setUpload] = useState(false)
  const [checkProgress, setCheckProgress] = useState(0);

  // Triggers upload event to firebase
  const formHandler = (e) => {
    e.preventDefault();
    const image = selectedImg;
    uploadImg(image);
    setUpload(true)
  };

  // Firebase function
  const uploadImg = (image) => {
    if (!image) return;
    const storageGet = getStorage();
    const storageRef = ref(storageGet, `images/${image.name.trim()}`)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on(
      "state_changed", 
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
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
    setMovie({
      title, 
      url: imgUrl})
  },[imgUrl])

  // updates array of movies
  useEffect(()=> {
    if(imgUrl !== '') {
      setMovies([...movies, movie])
    }
  },[movie])
  
  // Saves the new array in local storage
  useEffect(()=> {
    localStorage.setItem("movies", JSON.stringify(movies))
  },[movies])

  return (
    <div className='add-movie-container'>
      <div className="wrapper">
      {/* THANK YOU MESSAGE*/}
      {checkProgress === 100 && rejected.length === 0 ? 
        (
        <>
          <Fade direction={"down"}>
            <h1 className='ty-title'><strong>LITE</strong>FLIX</h1>
          </Fade>
          <Fade>
            <h2 className='ty-subtitle'>¡FELICITACIONES!</h2> 
            <h3 className='ty-description'>{title.toUpperCase()} FUE CORRECTAMENTE SUBIDA</h3>
          </Fade>
          <Fade direction={"up"}>
            <div className="ty-redirect-container">
              <a href="/" className='ty-redirect'>IR A HOME</a>
            </div>
          </Fade>
        </>
        )
      :
        (
          <>
          <Fade direction={"down"}>
            <h1 className='movie-container-title'>AGREGAR PELÍCULA</h1> 
          </Fade>
          <form 
          action=""
          className='add-movie-form'
          onSubmit={formHandler} 
          >
            {upload ? 
              <Fade direction={"down"}>
                <ProgressBar 
                  errors={rejected} 
                  onUploadChange={setUpload} 
                  onProgressChange={setCheckProgress} />
              </Fade> :
              <Fade duration={2000}>
                <DragAndDrop 
                onSelectedImgChange={setSelectedimg} 
                onRejected={setRejected}
                />
              </Fade>
            }
            <div className="form-group">
              <Fade duration={2000}>
                <input 
                  type="text"
                  className='input-title'
                  placeholder='TITULO' 
                  value={title.toUpperCase()} 
                  onChange={e => setTitle(e.target.value)} 
                />
              </Fade>
            </div>
            <div className="form-group">
              <Fade duration={2000}>
                <Button 
                  className={"upload"}
                  type={"submit"} 
                  text={"SUBIR PELÍCULA"} />
              </Fade>
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

