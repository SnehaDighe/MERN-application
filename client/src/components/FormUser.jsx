import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';
import Auth from '../modules/Auth';

class FormUser extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      description: '',
      formClassName: '',
      formSuccessMessage: '',
      formErrorMessage: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Fill in the form with the appropriate data if user id is provided
    if (this.props.userID) {
      const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/users/'+this.props.userID+'');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200 || xhr.status === 304) {
        this.setState({
          description: xhr.response.description,
        });
      }
    });
    xhr.send();
    }
  }

  handleInputChange(e) {
    const target = e.target;
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    const description = target.description;
    this.setState({ value: target.value });
  }

  handleSubmit(e) {
    // Prevent browser refresh
    e.preventDefault();
    const reqBody = {
      description: this.state.value
    }

    // Acknowledge that if the user id is provided, we're updating via PUT
    // Otherwise, we're creating a new data via POST
    const method = this.props.userID ? 'put' : 'post';
    const params = this.props.userID ? this.props.userID : '';

const description = encodeURIComponent(this.state.value);
     const formData = `description=${description}`;
    const xhr = new XMLHttpRequest();
    xhr.open(method, `api/users/${params}`);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
                  formClassName: 'success',
                  formSuccessMessage: xhr.response.msg
                });
          
                if (!this.props.userID) {
                  this.setState({
                    description: ''
                  });
                  this.props.onUserAdded(xhr.response.result);
                }
                else {
                  this.props.onUserUpdated(xhr.response.result);
                }
      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        this.setState({
          formClassName: 'warning',
          formErrorMessage: errors.summary
        });        
      }
    });
    xhr.send(formData);
  


    }

  render() {

    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;

    return (
      <Form className={formClassName} onSubmit={this.handleSubmit}>
        <Form.Input
          type='text'
          description='description'
          maxLength='40'
          required
          defaultValue="Hello!"
          value={this.value}
          onChange={this.handleInputChange}
        />
       
        <Message
          success
          color='green'
          content={formSuccessMessage}
        />
        <Message
          warning
          color='yellow'
          content={formErrorMessage}
        />
        <Button color={this.props.buttonColor} floated='right'>{this.props.buttonSubmitTitle}</Button>
        <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
      </Form>
    );
  }
}

export default FormUser;
