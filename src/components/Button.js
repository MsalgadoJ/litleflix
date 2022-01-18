import React from 'react';
import '../styles/Button.css'

const Button = ({className, type, text, icon=undefined, iconAlt=""}) => {
  return (
    <>
      <button
        className={`btn ${className}`}
        type={type}
      >
        {icon !== undefined ? <img src={icon} alt={iconAlt} title={iconAlt} /> : null}{text}
      </button>
    </>
  )
};

export default Button;

