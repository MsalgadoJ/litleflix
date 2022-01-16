import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import MovieAdd from './components/MovieAdd';
import './styles/App.css';

const App = () => {

  const bgOptions = ['main', 'other']

  const [bg, setBg] = useState(bgOptions[0]);
  const [bgUrl, setBgUrl] = useState('');

  const getBgImg = (path) => {
    if(path !== '') {
      setBgUrl(`https://image.tmdb.org/t/p/original${path}`)
    }
  }

  return (
    <div className="App" style={{background: bgUrl && bg === 'main' ? `url(${bgUrl})` : '#242424'}}>
      <div className="wrapper">
        <Router>
        <Header bgOptions={bgOptions} onComponentChange={setBg}/>
          <Routes>
            <Route path="/" element={<Home getBgImg={getBgImg}/>} />
            <Route path="/add-movie" element={<MovieAdd/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
