import React, { useState, useEffect, useRef } from 'react';
import DropdownItem from './DropdownItem';
import arrow from '../assests/images/arrow.png';
import check from '../assests/images/check.png';
import '../styles/DropdownMenu.css';

const DropdownMenu = ({options, selected, onSelectedChange}) => {

  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    document.body.addEventListener('click', (event) => {
      if(ref.current && ref.current.contains(event.target)) {
        return;
    }
    setOpen(false)
    })
  }, [])

  const renderOptions = options.map(option => {
    if(option.value === selected.value) {
      return (
        <DropdownItem 
          key={option.value}
          option={option}
          onSelectedChange={onSelectedChange}
          open={open}
          onOpenChange={setOpen}
          icon={check}
        >
            {option.label}
        </DropdownItem>
      )
    } else {
      return (
        <DropdownItem 
          key={option.value}
          option={option}
          onSelectedChange={onSelectedChange}
          open={open}
          onOpenChange={setOpen}
          icon={undefined}
        >
            {option.label}
        </DropdownItem>
      )
    }
  })

  return (
    <div ref={ref} className='dropdown-container'>
      <div className="dropdown">
          <div 
            className="dropdown-btn" 
            onClick={()=>setOpen(!open)}
          >
           <p className="dropdown-text">VER: <strong>{selected.label}</strong></p> 
           <img src={arrow} alt="chevron-down" title="chevron-down" />
          </div>
          <div className={`menu-visible ${open ? 'visible' : ''}`}>
            <div className={`menu ${open ? 'showOptions' : ''}`}>
              {open ? renderOptions : null}
            </div>
          </div>
      </div>
    </div>
  ) 
};

export default DropdownMenu;
;
