import React from 'react';

const DropdownItem = ({children, option, onSelectedChange, open, onOpenChange}) => {

  const onClickChanges = () => {
    onSelectedChange(option)
    onOpenChange(!open)
  }

  return (
      <a className="menu-item" onClick={onClickChanges}>
        {children}
        <span className="right-icon">{}</span>
      </a>
  )
}

export default DropdownItem;
