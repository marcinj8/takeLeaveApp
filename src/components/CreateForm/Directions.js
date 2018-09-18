import React from 'react';

import './Directions.css';

const changeMonth = props => {

  return (
    <div className='form__directionsContainer'>
      <div className='form__directions' onClick={props.previous}>Previous</div>
      <div className='form__label'>{props.children}</div>
      <div className='form__directions' onClick={props.next}>Next</div>
    </div>
  )
}

export default changeMonth;