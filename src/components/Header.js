import React from 'react'
import { Link } from 'react-router-dom';
import profilePic from '../assests/images/profile.png';
import vector from '../assests/images/vector.png';
import oval from '../assests/images/oval.png';
import '../styles/Header.css';
import { Fade } from "react-awesome-reveal";

const Header = () => {

  return (
    <div className="navbar">
      <div className="nav-wrapper">
        <div className="mobile-cta">
            <Fade direction={"down"}>
              <div className="round-btn">
                <Link to="/add-movie" className='mobile'>+</Link>
              </div>
            </Fade>
        </div>
        <Fade direction={"down"}>
          <ul className="left-nav">
              <li><Link to="/" className='link logo'><strong>LITE</strong>FLIX</Link>
            </li>
            <li><Link 
            to="/add-movie" className='link desktop'>+ AGREGAR PELÍCULA</Link>
            </li>
          </ul>
        </Fade>
        <Fade direction={"down"}>
          <ul className="right-nav">
            <li className="burger-menu">
              <div className="stripes"></div>
              <div className="stripes"></div>
              <div className="stripes"></div>
            </li>
            <li className="notifications">
              <img className='bell' src={vector} alt="bell" />
              <img className='dot' src={oval} alt="dot" />
            </li>
            <li className="profile">
              <img src={profilePic} alt="Profile pic" />
            </li>
          </ul>
        </Fade>
      </div>
    </div>
  )
}

export default Header
