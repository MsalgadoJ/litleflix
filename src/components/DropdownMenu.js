import React, { useState, useEffect, useRef } from 'react';
import DropdownItem from './DropdownItem';
import '../styles/DropdownMenu.css';
import { CSSTransition } from 'react-transition-group';

const DropdownMenu = ({options, selected, onSelectedChange}) => {

  const [open, setOpen] = useState(false);
  const ref = useRef();

  const [activeMenu, setActiveMenu] = useState('main')

  useEffect(() => {
    document.body.addEventListener('click', (event) => {
      if(ref.current && ref.current.contains(event.target)) {
        return;
    }
    setOpen(false)
    })
  }, [])

  const renderOptions = options.map(option => {
    return (
      <DropdownItem 
        key={option.value}
        option={option}
        onSelectedChange={onSelectedChange}
        open={open}
        onOpenChange={setOpen}
      >
          {option.label}
      </DropdownItem>
    )
  })

  return (
    <div ref={ref} className='dropdown-container'>
      <div className="dropdown">
          <div className="dropdown-btn" onClick={()=>setOpen(!open)}>
           <p className="text">VER: {selected.label}</p>
          </div>
          <div className="menu-visible">
            <CSSTransition 
              in={activeMenu === 'main'}
              unmountOnExit
              timeout={500}
              classNames="menu-primary"
            >
              <div className="menu">
                {open ? renderOptions : null}
              </div>
            </CSSTransition>
          </div>
      </div>
    </div>
  ) 
};
{/* <h3><button className='btn list' onClick={() => setOpen(!open)}>VER: POPULARES <img src={arrow} className="arrow" alt="arrow" /></button></h3>
{open ? <Dropdown setList={toggleList}/> : null}
<DropdownItem onClick={setList('popular')}>POPULARES</DropdownItem>
<DropdownItem onClick={setList('personalized')}>MIS PELÍCULAS</DropdownItem> */}

export default DropdownMenu;
;
