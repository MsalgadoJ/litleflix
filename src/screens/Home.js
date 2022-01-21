import React, {useState, useEffect} from 'react';
import VideoItem from '../components/VideoItem';
import Button from '../components/Button';
import moviesdb from '../apis/moviesdb';
import path from '../assests/images/path.png';
import DropdownMenu from '../components/DropdownMenu'
import {options} from '../assests/helpers/helpers';
import '../styles/Home.css'
import { Fade, Slide } from "react-awesome-reveal";

const Home = () => {

  
  const [video, setVideo] = useState('');
  const [popular, setPopular] = useState([]);
  const [myList, setMyList] = useState([])
  const [innerWidth, setInnerwidth] = useState('');
  const [selected, setSelected] = useState(options[0])

  // Get main movie
  const getMovies = async () => {
    const results = await moviesdb.get('/now_playing');
    setVideo(results.data.results[0])
  }

  // Get popular movies
  const getPopular = async () => {
    const popularResults = await moviesdb.get('/popular');
    setPopular(popularResults.data.results.slice(0,4))
  }

  // Get custom list
  const getMyList = () => {
    const savedList = localStorage.getItem("movies");
    const initialList = JSON.parse(savedList);
    let movieState;
    // When the use doesn't have anything saved in local storage it returns null, so we make a conditional
    if(initialList !== null) {
      if(initialList.length>4) {
        // in case de the user had saved more than 4 movies
        movieState = initialList.slice(0,4)
      } else if(initialList.length<5) {
        movieState = initialList
      }
    } else {
      movieState = []
    }
    return setMyList(movieState)
  }

  const renderPopular = popular.map((movie, i) => {
    return (
      <VideoItem 
        key={i} 
        movie={movie} 
        url={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`} 
        showInfo={true} 
      />
    )
  });

  const renderMyList = (list) => {
    if(list.length > 0) {
      let renderMovies = list.map((movie, i) => {
        return (
          <VideoItem key={i} movie={movie} url={movie.url} />
        )
      })
      return renderMovies;
    } else {
      return (
        <Slide direction={"right"}>
        <div className='no-list-text'>
          <p>NO HAS AGREGADO NINGUNA PELÍCULA</p>
        </div>
        </Slide>
      )
    }
  } 

  useEffect(() => {
    getMovies();
    getPopular();
    getMyList()
    setInnerwidth(window.innerWidth)
  }, []);

  return (
    <div 
      className="main-container" 
      style={{background: `${innerWidth > 414 ? 
        `url(https://image.tmdb.org/t/p/original${video.backdrop_path}) no-repeat center/cover` 
        : 
        `linear-gradient(180deg, rgba(36, 36, 36, 0) 0%, #242424 100%), url(https://image.tmdb.org/t/p/original${video.backdrop_path}) no-repeat center/cover`}`      }}
    >
      <div className="wrapper">
        <div className="main-container-columns">
          <section className="main-content">
            <Fade direction={"down"}>
            <p className="hero-subtitle">ORIGINAL DE <strong>LITEFLIX</strong></p>
            </Fade>
            <Fade direction={"left"}>
            {video !== '' ?
            <h2 className={`hero-title ${video.title.length> 17 ? 'long-text' : ''}`}>{video.title.toUpperCase()}</h2>
            : null}
            </Fade>
            <div className="hero-btns">
            <Fade direction={"up"}>
              <Button 
                className={'play'}
                type={""}
                text={'REPRODUCIR'}
                icon={path}
                iconAlt={"path"} />
            </Fade>
            <Fade direction={"up"}>
              <Button 
                className={'list'}
                type={""}
                text={'+ MI LISTA'}
                icon={undefined}
                iconAlt={""} />
            </Fade>
            </div>
          </section>
          <section className="side-container">
            <DropdownMenu 
              options={options} 
              selected={selected} 
              onSelectedChange={setSelected}
            />
            <div className="list-container">
              {selected.value === 'popular' ? renderPopular : renderMyList(myList)}
            </div>
          </section>
        </div>
      </div>
    </div>

  )
}

export default Home;
