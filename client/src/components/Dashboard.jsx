import React from 'react';
import PropTypes from 'prop-types';
// import { Card, CardTitle, CardText } from 'material-ui/Card';
//import {Container} from '@material-ui/core';
import { Container, Card } from 'semantic-ui-react'


const Dashboard = ({ secretData, user }) => (
  <Container className="container">
    <Card.Header
      title="Dashboard"
      subtitle="You should get access to this page only after authentication."
    />
  {secretData && <Card.Description style={{ fontSize: '16px', color: 'green' }}>Welcome <strong>{user.name}</strong>!<br />{secretData}</Card.Description>}
  
  </Container>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
