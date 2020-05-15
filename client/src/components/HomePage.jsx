import React from 'react';
// import { Card, CardTitle, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';
// import {Box, CardHeader} from '@material-ui/core';
import { Container ,Card} from 'semantic-ui-react'

class HomePage extends React.Component {

  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus()
  }

  render() {
    const { classes } = this.props;
    return (

      <Container className="container">
        <Card.Header  style={{ fontSize: '20px', fontFamily:'Arial'}} >You can start maintaining your journal online now!!</Card.Header>
          {Auth.isUserAuthenticated() ? (
            <Card.Description style={{ fontSize: '20px'}}>Welcome! You are logged in.</Card.Description >
          ) : (
            <Card.Description  style={{ fontSize: '20px'}}>Please login to start tracking.</Card.Description >
          )}
      </Container>

    )
  }
};

export default HomePage;
