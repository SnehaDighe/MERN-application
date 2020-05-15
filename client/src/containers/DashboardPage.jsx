import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
//import {Container} from '@material-ui/core';
import { Container } from 'semantic-ui-react'
import TableUser from '../components/TableUser.jsx';
import ModalUser from '../components/ModalUser.jsx';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    //this.server = process.env.REACT_APP_API_URL || '';
   // this.socket = io.connect(this.server);

    this.state = {
      secretData: '',
      postloginDetails: {},
      users: [],
      usersInfo:[]
    };

    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleUserAdded = this.handleUserAdded.bind(this);
    this.handleUserUpdated = this.handleUserUpdated.bind(this);
    this.handleUserDeleted = this.handleUserDeleted.bind(this);
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200 || xhr.status === 304) {
        this.setState({
          secretData: xhr.response.message,
          user: xhr.response.user
        });
      }
      this.fetchUsers();
    });
    xhr.send();

  }
  // Fetch data from the back-end
  fetchUsers() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/users/');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200 || xhr.status === 304) {
        //console.log("xhr.response.user--"+xhr.response.user);
        this.setState({
          postloginDetails: xhr.response
        });
        this.setState({ usersInfo: xhr.response});
      }
    });
    xhr.send();
  }

  handleUserAdded(postloginDetails) {
    this.state.usersInfo.push(postloginDetails);
    this.setState({ usersInfo: this.state.usersInfo });
  }

  handleUserUpdated(user) {
    let users = this.state.usersInfo;
    for (let i = 0, n = users.length; i < n; i++) {
      if (users[i]._id === user._id) {
        users[i].description = user.description;
        break; // Stop this loop, we found it!
      }
    }
    this.setState({ users: users });
  }

  handleUserDeleted(user) {
    let users = this.state.usersInfo;
    users = users.filter(u => { return u._id !== user._id; });
    this.setState({ users: users });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <Container>
    <Dashboard secretData={this.state.secretData} user={this.state.user} />
    {/* <SimpleTabs/> */}
    <ModalUser
            headerTitle='Add User'
            buttonTriggerTitle='Add New'
            buttonSubmitTitle='Add'
            buttonColor='green'
            onUserAdded={this.handleUserAdded}
          />
          <TableUser
            usersInfo={this.state.usersInfo}
            onUserUpdated={this.handleUserUpdated}
            onUserDeleted={this.handleUserDeleted}
          />
    </Container>
      );
  }

}

export default DashboardPage;
