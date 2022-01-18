import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './screens/Home';
import MovieAdd from './screens/MovieAdd';
import './styles/App.css';

const App = () => {
  return (
    <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-movie" element={<MovieAdd/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
