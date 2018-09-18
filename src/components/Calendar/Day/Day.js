import React from 'react';

import './Day.css';

const day = props => {
  let clicked = () => false;
  let style = ['calendar__day'];
  
  if (props.class) {
    style.push(props.class);
  }

  if (props.currentDay) {
    style.push('currentDay');
    clicked = () => false;
  } else if (props.leaves || props.disabledDates) {
    style.push('leaves');
    clicked = () => props.clicked(props.choosenDay);
  } else if (props.choosenDay) {
    style.push('choosenDay');
    clicked = () => props.clicked(props.choosenDay);
  } else if (props.employeeLeaves) {
    style.push('employeeLeaves');
  } else if (props.disabled) {
    clicked = () => false;
  } else {
    clicked = () => props.clicked(props.choosenDay);
  }

  return (
    <div onClick={() => clicked()} className={style.join(' ')}>
      {props.day}
    </div>
  );
};

export default day;