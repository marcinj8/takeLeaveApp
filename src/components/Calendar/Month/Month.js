import React from 'react';
import Day from '../Day/Day';

import './Month.css';

const month = props => {
  let month = [];
  let printYear = null;
  let currentDay = false;
  const days = [...Array(new Date(new Date(props.year, props.month).setDate(0)).getDate())];
  const firstMonthDay = new Date(props.year, props.month - 1, 1).getDay() - 1;
  let style = 'calendar__monthBlock';
  let childClass = [];
  let disabled = false;
  let choosenDay = false;
  let leaves = false;
  let pastDay = false;
  let disabledDates = false;
  let employeeLeaves = false;


  if (props.class) {
    style = props.class;
  } else {
    for (let i = 1; i <= firstMonthDay; i++) {
      month.push(<Day
        key={new Date(props.year, props.month, i).getTime() + 'empty'}
        day='' />);
    }
  }

  const isWeekend = day => {
    if (day === 0 || day === 6) {
      childClass = 'calendar__day--weekend';
      disabled = true;
    } else {
      childClass = 'calendar__day--active';
      disabled = false;
    }
  };

  const isCurrentDay = (day) => {
    if (props.currentDate && day === props.currentDate.getDate()) {
      currentDay = true;
      return;
    } else if (props.currentDate > new Date(props.year, props.month - 1, day)) {
      currentDay = false;
      pastDay = true;
      return;
    } else {
      currentDay = false;
      pastDay = false;
    }
  };

  const checkDate = (day, propsArg) => {
    let fulfillCondition = false;
    if (propsArg) {
      for (let key in propsArg) {
        if (propsArg[key].date.day === day &&
          propsArg[key].date.month === props.month) {
          fulfillCondition = true;
          return fulfillCondition
        } else {
          fulfillCondition = false;
        }
      }
    } else {
      fulfillCondition = false;
    }
    return fulfillCondition;
  };

  const dayChecking = (day) => {
    isCurrentDay(day + 1);
    leaves = checkDate(day + 1, props.leaves);
    choosenDay = checkDate(day + 1, props.choosenDays);
    disabledDates = checkDate(day + 1, props.disabledDates);
    employeeLeaves = checkDate(day + 1, props.employeeLeaves);
    isWeekend(new Date(props.year, props.month - 1, day + 1).getDay());
  };

  days.map((__, day) => {
    let key = new Date(props.year, props.month, day + 1).getTime();
    dayChecking(day);
    month.push(
      <Day
        leaves={leaves}
        choosenDay={choosenDay}
        disabledDates={disabledDates}
        employeeLeaves={employeeLeaves}
        disabled={disabled || pastDay || leaves}
        clicked={(isChoosen) => props.clicked(isChoosen, day + 1, props.month, props.year, key)}
        currentDay={currentDay}
        class={childClass}
        key={key}
        day={day + 1} />);
    return month;
  });

  if (props.month === 1) {
    printYear = <h3>Year: {props.year}</h3>;
  }

  return (
    <div className={style}>
      {printYear}
      <h3> Month: {props.month} </h3>
      <div className='calendar__month'>
        {month}
      </div>
    </div>
  );
};

export default month;