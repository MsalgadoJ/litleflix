import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import MovieAdd from './components/MovieAdd';
import './styles/App.css';

const App = () => {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-movie" element={<MovieAdd/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
