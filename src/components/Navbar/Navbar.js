import React from 'react';
import NavbarItems from './NavbarItems';

import './Navbar.css';

const navbar = props => (
  <nav className='navbar'>
    <NavbarItems
      navigationItems={props.navigationItems}
      clicked={props.changeView} 
      isActive={props.isActive}/>
  </nav>
)

export default navbar;