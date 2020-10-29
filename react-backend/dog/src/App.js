import React, { Component } from 'react';
import Demo from './components/Demo'
import AppointmentFormContainer from './components/AppointmentFormContainer'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});
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
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    );
  }
}

export default App;