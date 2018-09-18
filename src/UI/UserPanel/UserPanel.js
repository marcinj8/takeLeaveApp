import React, { Component } from 'react';

import CreateForm from '../../components/CreateForm/CreateForm';

class UserPanel extends Component {
  state = {
    employees: [
      'Tom', 'Susan', 'Joe', 'Harry', 'Amanda', 'Barbara'
    ],
    employeNo: 0,
    displayMonth: '',
    displayYear: '',
  };

  componentWillMount() {
    this.setState({
      displayMonth: this.props.month,
      displayYear: this.props.year
    });
  }

  showPrevious = () => {
    if (this.state.displayMonth === 1) {
      this.setState({
        displayMonth: 12,
        displayYear: this.state.displayYear - 1
      });
    } else {
      this.setState({
        displayMonth: this.state.displayMonth - 1,
      });
    }
  }

  showNext = () => {
    if (this.state.displayMonth === 12) {
      this.setState({
        displayMonth: 1,
        displayYear: this.state.displayYear + 1
      });
    } else {
      this.setState({
        displayMonth: this.state.displayMonth + 1,
      });
    }
  }

  previousPerson = () => {
    if(this.state.employeNo > 0){
      this.setState({
        employeNo: this.state.employeNo - 1
      })
    }
  }

  nextPerson = () => {
      if(this.state.employeNo < this.state.employees.length - 1){
      this.setState({
        employeNo: this.state.employeNo + 1
      })
    }
  }

  render() {
    let userPanel = null;

    if (this.props.show) {
      userPanel = (
        <div>
          <CreateForm
            previousPerson={this.previousPerson}
            nextPerson={this.nextPerson}
            confirmDays={this.props.confirmDays}
            chooseDay={this.props.chooseDay}
            showPrevious={this.showPrevious}
            showNext={this.showNext}
            leaves={this.props.leaves}
            choosenDays={this.props.choosenDays}
            employees={this.state.employees}
            year={this.state.displayYear}
            month={this.state.displayMonth}
            employeNo={this.state.employeNo}
            currentDay={this.props.currentDay}
            leave={this.props.leave} />
        </div>
      );
    }

    return userPanel;
  }
}

export default UserPanel;