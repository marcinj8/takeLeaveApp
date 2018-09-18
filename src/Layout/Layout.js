import React, { Component } from 'react';

import Navigation from '../components/Navbar/Navbar';
import Calendar from '../components/Calendar/Calendar';
import UserPanel from '../UI/UserPanel/UserPanel';

class Layout extends Component {
  state = {
    year: '',
    month: '',
    showMonths: 2,
    currentDay: '',
    leaves: [],
    fullCalendar: true,
    userPanel: true,
    choosenDays: [],
    dayInfo: null
  };

  componentWillMount() {
    let setUpDate = new Date();
    this.setState({
      year: setUpDate.getFullYear(),
      month: setUpDate.getMonth() + 1,
      currentDay: setUpDate
    });
  }

  showDetailsHandler = (...arg) => {
    console.log(arg)
  }

  setChoosenDay = (day, month, year, key, name) => {
    const newDay = {
      date: {
        year: year,
        month: month,
        day: day,
      },
      key: key,
      name: name
    };
    let updateChoosenDate = this.state.choosenDays;
    updateChoosenDate.push(newDay);
    this.setState({
      choosenDays: updateChoosenDate
    });
  }

  removeChoosenDay = (dayID) => {
    let choosenDates = [
      ...this.state.choosenDays
    ];
    let updateChoosenDate = choosenDates.filter((date) => {
      return date.key !== dayID;
    });
    this.setState({
      choosenDays: updateChoosenDate
    });
  }

  choosingDayHandler = (isSet, day, month, year, key, name) => {
    if (isSet) {
      this.removeChoosenDay(key);
    } else {
      this.setChoosenDay(day, month, year, key, name);
    }
  }

  confirmDaysHandler = () => {
    const choosenDays = [
      ...this.state.choosenDays
    ];
    const updateLeaves = [
      ...this.state.leaves
    ];
    for (let value of choosenDays) {
      updateLeaves.push(value);
    }

    this.setState({
      leaves: updateLeaves,
      choosenDays: []
    });
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <Navigation />
        {this.state.dayInfo}
        <br />
        <br />
        <br />
        <br />
        <Calendar
          data={this.state}
          showDetails={this.showDetailsHandler} />
        <UserPanel
          leaves={this.state.leaves}
          confirmDays={this.confirmDaysHandler}
          chooseDay={this.choosingDayHandler}
          choosenDays={this.state.choosenDays}
          year={this.state.year}
          month={this.state.month}
          currentDay={this.state.currentDay}
          leave={this.state.leave}
          show={this.state.userPanel} />
      </div >
    );
  }
}

export default Layout;