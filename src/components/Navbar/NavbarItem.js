import React from 'react';

import './NavbarItem.css';

const navbarItem = props => (
  <div 
  onClick={props.clicked} 
  className={props.isActive ? 'navbar__item navbar__item--active' : 'navbar__item'}>
    {props.children}
  </div>
);

export default navbarItem;