import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import '../styles/Header.css'
import profilePic from '../assests/images/profile.png'
import vector from '../assests/images/vector.png'
import oval from '../assests/images/oval.png'

const Header = () => {


  return (
    <div className="navbar">
      <div className="nav-wrapper">
        <ul className="left-nav">
          <li><Link to="/" className='link logo'>LITE<span>FLIX</span></Link>
          </li>
          
          <li><Link 
          to="/add-movie" className='link'>+ AGREGAR PELÍCULA</Link>
          </li>
        </ul>
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
      </div>
    </div>
  )
}

export default Header
