import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { Card, CardText } from 'material-ui/Card';
// import RaisedButton from 'material-ui/RaisedButton';
// import {Box,Button} from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
import { Container ,Card, Button} from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
  toggleAuthenticateStatus
}) => (
  <Container className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Login</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.summary && <p className="error-message">{errors.summary}</p>}

      {/* <div >
        <TextField
          label="Email"
          name="email"
          errortext={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div> */}
      <div className="field-line">
      <Input placeholder='Search...' type="text" placeholder="Search..." label="Email"
          name="email"
          errortext={errors.email}
          onChange={onChange}
          value={user.email} />
      </div>
      <div className="field-line">
        {/* <TextField
          label="Password"
          type="password"
          name="password"
          onChange={onChange}
          errortext={errors.password}
          value={user.password}
/> */}
          <Input placeholder='Search...' label="Password"
          type="password"
          name="password"
          onChange={onChange}
          errortext={errors.password}
          value={user.password} />

        
      </div>

      <div className="button-line">
        {/* <RaisedButton type="submit" label="Log in" primary /> */}
        <Button  type="submit">
            Log In    
        </Button>
      </div>

      <Card.Description>Don't have an account? <Link to={'/signup'}>Create one</Link>.</Card.Description>
    </form>
  </Container>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
