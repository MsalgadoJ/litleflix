import React, {useState, useEffect} from 'react';
import Header from './Header';
import VideoItem from './VideoItem';
import Button from './Button';
import moviesdb from '../apis/moviesdb';
import path from '../assests/images/path.png';
import DropdownMenu from './DropdownMenu'
import '../styles/Home.css'
import { Fade, Zoom } from "react-awesome-reveal";

const Home = () => {

  const [video, setVideo] = useState('');
  const [popular, setPopular] = useState([]);
  const [myList, setMyList] = useState([])

  const options = [
    {
      label: 'POPULAR',
      value: 'popular'
    },
    {
      label: 'MIS PELÍCULAS',
      value: 'myMovies'
    }
  ]

  const [selected, setSelected] = useState(options[0])

  const getMovies = async () => {
    const results = await moviesdb.get('/now_playing');
    console.log(results)
    setVideo(results.data.results[0])
  }

  const getPopular = async () => {
    const popularResults = await moviesdb.get('/popular');
    setPopular(popularResults.data.results.slice(0,4))
  }

  const renderPopular = popular.map(movie => {
    return (
      <VideoItem movie={movie} url={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`} />
    )
  });

  const getMyList = () => {
    const savedList = localStorage.getItem("movies");
    const initialList = JSON.parse(savedList);
    return setMyList(initialList.slice(0,4)) || [];
  }

  const renderMyList = myList.map(movie => {
    return (
      <VideoItem movie={movie} url={movie.url} />
    )
  })

  useEffect(() => {
    getMovies();
    getPopular();
    getMyList()
  }, []);

  return (
    <Fade >
    <div 
      className="main-container" 
      style={{background:`url(https://image.tmdb.org/t/p/original${video.backdrop_path})` }}
    >
      <Header />
      <div className="wrapper">
        <div className="main-container-columns">
          <section className="main-content">
            <p className="hero-subtitle">ORIGINAL DE <strong>LITEFLIX</strong></p>
            <Zoom>
            <h2 className="hero-title">{video !== '' ? (video.title).toUpperCase() : null }</h2>
            </Zoom>
            <div className="hero-btns">
              <Button 
                className={'play'}
                type={""}
                text={'REPRODUCIR'}
                icon={path}
                iconAlt={"path"} />
              <Button 
                className={'list'}
                type={""}
                text={'+ MI LISTA'}
                icon={undefined}
                iconAlt={""} />

              {/* <button className="btn play"> <img src={path} alt="path" /> REPRODUCIR</button> */}
              {/* <button className='btn list'>+ MI LISTA</button> */}
            </div>
          </section>
          <section className="side-container">
            <DropdownMenu 
              options={options} 
              selected={selected} 
              onSelectedChange={setSelected}
            />
            <div className="list-container">
              {selected.value === 'popular' ? renderPopular : renderMyList}
            </div>
          </section>
        </div>
      </div>
    </div>
    </Fade>
  )
}

export default Home;
