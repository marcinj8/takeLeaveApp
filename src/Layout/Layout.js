import React, { Component } from 'react';
import axios from 'axios';

import Navigation from '../components/Navbar/Navbar';
import Calendar from '../components/Calendar/Calendar';
import UserPanel from '../UI/UserPanel/UserPanel';

class Layout extends Component {
  state = {
    navigation: ['Calendar', 'Leaves Panel'],
    year: '',
    month: '',
    showMonths: 12,
    currentDay: '',
    leaves: [],
    fullCalendar: true,
    userPanel: false,
    choosenDays: [],
    dayInfo: '',
    error: ''
  };

  componentWillMount() {
    let setUpDate = new Date();
    this.setState({
      year: setUpDate.getFullYear(),
      month: setUpDate.getMonth() + 1,
      currentDay: setUpDate
    });
    this.fetchCalendarData();
  }

  setUpCalendarData = data => {
    let fetchedData = data;
    let updateCalendar = [];
    for (let key in fetchedData) {
      for (let value of fetchedData[key]) {
        updateCalendar.push(value);
      }
    }
    this.setState({
      leaves: updateCalendar
    });
  }

  fetchCalendarData = () => {
    axios.get(`https://setleaveday.firebaseio.com/leaves.json`)
      .then(res => {
        this.setUpCalendarData(res.data);
      })
      .catch(err => this.setState({
        error: err.message
      }));
  }

  changeView = () => {
    this.setState({
      fullCalendar: !this.state.fullCalendar,
      userPanel: !this.state.userPanel,
    })
  }

  showDetailsHandler = (...arg) => {
    if(arg[0] !== undefined) {
      this.setState({
        dayInfo: arg
      })
    }
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

  setUpLeavesDays = leaves => {
    axios.post(`https://setleaveday.firebaseio.com/leaves.json`, leaves);
    // .then(res => console.log(res))
    // .catch(err => console.log(err));
  }

  confirmDaysHandler = () => {
    const choosenDays = [
      ...this.state.choosenDays
    ];
    this.setUpLeavesDays(choosenDays);
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
    let calendar = null;

    if (this.state.error) {
      calendar = this.state.error;
    } else {
      return calendar = (
        <div>
          <Navigation
            changeView={this.changeView}
            navigationItems={this.state.navigation} 
            isActive={[this.state.fullCalendar, this.state.userPanel]}/>
            <Calendar
            data={this.state}
            showDetails={this.showDetailsHandler} />
            <div style={{'padding': '70px 0'}}>
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
          </div>
        </div >
      );
    }

    return calendar;
  }
}

export default Layout;