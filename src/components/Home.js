import React, {useState, useEffect} from 'react'
import moviesdb from '../apis/moviesdb';
import '../styles/Home.css'
import ellipse from '../assests/images/ellipse.png';
import path from '../assests/images/path.png';
import arrow from '../assests/images/arrow.png'
import DropdownMenu from './DropdownMenu'

const Home = ({ getBgImg }) => {

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
    getBgImg(results.data.results[0].backdrop_path)
  }

  const getPopular = async () => {
    const popularResults = await moviesdb.get('/popular');
    setPopular(popularResults.data.results.slice(0,4))
  }

  const renderPopular = popular.map(movie => {
    return (
      <div className='movie-container' key={movie.id} 
      style={{background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 22.78%, #000000 122.69%), url(https://image.tmdb.org/t/p/w300${movie.backdrop_path}) `}}>
        <h3 className='thumb-title'>{movie.title}</h3>
        <img src={ellipse} className="ellipse" alt="ellipse" />
        <img src={path} className="play" alt="path" />
      </div>
    )
  });

  const getMyList = () => {
    const savedList = localStorage.getItem("movies");
    const initialList = JSON.parse(savedList);
    return setMyList(initialList) || [];
  }

  const renderMyList = myList.map(movie => {
    return (
      <div>
        <h3>{movie.name}</h3>
        <img src={movie.url} alt="" />
      </div>
    )
  })

  useEffect(() => {
    getMovies();
    getPopular();
    getMyList()
  }, []);

  return (
    <div className="main-container">
      <section className="main-content">
        <p className="hero-subtitle">ORIGINAL DE <span>LITEFLIX</span></p>
        <h2 className="hero-title">{video !== '' ? (video.title).toUpperCase() : null }</h2>
        <div className="hero-btns">
          <button className="btn play"> <img src={path} alt="path" /> REPRODUCIR</button>
          <button className='btn list'>+ MI LISTA</button>
        </div>
      </section>
      <section className="list-container">
        <DropdownMenu 
          options={options} 
          selected={selected} 
          onSelectedChange={setSelected}
        />
        {selected.value === 'popular' ? renderPopular : renderMyList}
      </section>
    </div>
  )
}

export default Home;
