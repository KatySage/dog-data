import React, { Component } from 'react';
import './App.css';
import Demo from './components/Demo'

import AppointmentFormContainer from './components/AppointmentFormContainer'
class App extends Component {
  state = {users: [], data: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
    fetch('/schedule')
      .then(res => res.json())
      .then(data => this.setState({ data }));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
        <h1>Users</h1>
        {this.state.data.map(item =>
          <div key={item.AppointmentId}>{item.Text}</div>
        )}

        <AppointmentFormContainer appointmentData={this.state.data} />
        <Demo data={this.state.data} />
      </div>
    );
  }
}

export default App;