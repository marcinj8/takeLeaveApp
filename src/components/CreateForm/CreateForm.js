import React from 'react';
import Aux from 'react-aux';

import Directions from '../CreateForm/Directions';
import Month from '../Calendar/Month/Month';

import './CreateForm.css';

const createForm = props => {
  let currentDay = false;
  let employeesArray = [];

  if (props.currentDay.getMonth() + 1 === props.month) {
    currentDay = props.currentDay;
  }

  const employerFilter = (object, filter, returnFilter = true) => {
    if (returnFilter) {
      return object.filter(data => {
        return data.name === filter
      })
    } else {
      return object.filter(data => {
        return data.name !== filter
      })
    }
  }

  props.employees.map(name => {
    return (
      employeesArray.push(
        <div key={name} className='userPanel__form'>
          <Directions
            previous={props.showPrevious}
            next={props.showNext}>
            Date: {props.month} / {props.year}
          </Directions>
          <Directions
            previous={props.previousPerson}
            next={props.nextPerson}>
            Employee: {name}
          </Directions>
          <Month
            name={name}
            clicked={(...arg) => props.chooseDay(...arg, name)}
            choosenDays={employerFilter(props.choosenDays, name)}
            employeeLeaves={employerFilter(props.leaves, name)}
            leaves={employerFilter(props.leaves, name, false)}
            disabledDates={employerFilter(props.choosenDays, name, false)}
            class='calendar__monthBlock--settingLeave'
            employees={props.employees}
            year={props.year}
            month={props.month}
            currentDate={currentDay} />
        </div>
      ))
  });

  return (
    <Aux>
      <button className='userPanel__button' onClick={props.confirmDays}>Confirm</button>
      {employeesArray[props.employeNo]}
    </Aux>
  );
};
export default createForm;