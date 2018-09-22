import React from 'react';

import NavbarItem from './NavbarItem'

const navbarItems = props => {

  let navbarItems = [];

  props.navigationItems.map((item, i) => {
    navbarItems.push(
      <NavbarItem
        isActive={props.isActive[i]}
        key={item}
        clicked={props.clicked}>{item}</NavbarItem>
    )
    return navbarItems
  })

  return navbarItems;
};

export default navbarItems;