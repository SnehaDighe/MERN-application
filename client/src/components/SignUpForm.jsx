import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { Card, CardText } from 'material-ui/Card';
// import RaisedButton from 'material-ui/RaisedButton';
// import {Box,Button} from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
import { Container,Button, Input ,Card} from 'semantic-ui-react'


const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <Container className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        {/* <TextField
          label="Name"
          name="name"
          errortext={errors.name}
          onChange={onChange}
          value={user.name}
        /> */}
        <Input placeholder='Search...' type="text" label="Name"
          name="name"
          errortext={errors.name}
          onChange={onChange}
          value={user.name} />
      </div>

      <div className="field-line">
        {/* <TextField
          label="Email"
          name="email"
          errortext={errors.email}
          onChange={onChange}
          value={user.email}
        /> */}
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
        {/* <RaisedButton type="submit" label="Create New Account" primary /> */}
        <Button type="submit">
        Create New Account
    </Button>
      </div>

      <Card.Description>Already have an account? <Link to={'/login'}>Log in</Link></Card.Description>
    </form>
  </Container>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
