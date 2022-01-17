import React from 'react';

const DropdownItem = ({children, option, onSelectedChange, open, onOpenChange, icon}) => {

  const onClickChanges = () => {
    onSelectedChange(option)
    onOpenChange(!open)
  }

  return (
    <div className="menu-item" onClick={onClickChanges}>
      <p className="menu-item-text">{children}</p>
      {icon !== undefined ?
      <p className="menu-item-icon"><img src={icon} alt="checked" title='checked' /></p>
      : null}
    </div>
  )
}

export default DropdownItem;
