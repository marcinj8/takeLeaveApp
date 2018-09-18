import React from 'react';

import Month from './Month/Month';
// import creator from '../../CalendarCreator/CalendarCreator';

import './Calendar.css';

const calendar = props => {
  let counter = props.data.showMonths;
  let months = [];
  let currentDate = false;
  let year = props.data.year;

  if (!props.data.fullCalendar) {
    return months = null;
  }

  const isCurrentDate = date => {
    if (date === props.data.currentDay.getMonth() + 1) {
      currentDate = props.data.currentDay;
    } else {
      currentDate = false;
    }
    return currentDate;
  };

  const createMonths = (month = props.data.month, year = props.data.year) => {
    for (month; month <= 12 && counter > 0; month++) {
      counter--;
      isCurrentDate(month);
      months.push(
        <Month
          leaves={props.data.leaves}
          choosenDays={props.data.choosenDays}
          clicked={props.showDetails}
          currentDate={currentDate}
          key={month + '/' + props.data.year}
          year={year}
          month={month} />);
    }
  };

  createMonths(props.data.month, props.data.year);
  if (counter > 0) {
    year = year + 1;
    createMonths(1, year);
  }

  return (
    <div className='calendar'>
      {months}
    </div>
  );
};

export default calendar;