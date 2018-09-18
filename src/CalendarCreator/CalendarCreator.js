import Month from '../components/Calendar/Month/Month';

export const creator = (showMonths, month, year, properties) => {

  let counter = showMonths;
  let months = [];
  let properties = [...properties]

  const isCurrentDate = date => {
    if (date === props.data.currentDay.getMonth() + 1) {
      currentDate = props.data.currentDay;
    } else {
      currentDate = false;
    }
    return currentDate;
  }

  const createMonths = (month, year) => {
    for (month; month <= 12 && counter > 0; month++) {
      counter--;
      isCurrentDate(month);
      months.push(
        <Month
          currentDate={currentDate}
          key={month + '/' + props.data.year}
          year={year}
          month={month} />)
    }
    createMonths(props.data.month, props.data.year)
    if (counter > 0) {
      year = year + 1;
      createMonths(1, year);
    }
  }

  createMonths(month, year)
  if (counter > 0) {
    year = year + 1;
    createMonths(1, year);
  }
  // return months
  console.log(months)
}