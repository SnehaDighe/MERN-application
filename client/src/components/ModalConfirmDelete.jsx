import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';
import Auth from '../modules/Auth';
import DashboardPage from '../containers/DashboardPage.jsx';

class ModalConfirmDelete extends Component {

  constructor(props) {
    super(props);

    this.state ={
      modalOpen: false,
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  //handleOpen = e => this.setState({ modalOpen: true });
  handleOpen(e) {
    this.setState({ modalOpen: true });
  }

  //handleClose = e => this.setState({ modalOpen: false });
  handleClose(e) {
    
    this.setState({ modalOpen: false });
    
  }
  handleSubmit(e) {

    let params = e.target.getAttribute('data-id');

    axios({
      method: 'delete',
      responseType: 'json',
      url: `api/users/${params}`,
      headers: {
        Authorization: `bearer ${Auth.getToken()}`,
    },
    })
    .then((response) => {
      this.handleClose();
      
    })
    .catch((err) => {
      this.handleClose();
      throw err;
    });
  }

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen} color={this.props.buttonColor}>{this.props.buttonTriggerTitle}</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        dimmer='inverted'
        size='tiny'
      >
        <Modal.Header>{this.props.headerTitle}</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete <strong>{this.props.user.description}</strong>?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleSubmit} data-id={this.props.user._id} color='red'>Yes</Button>
          <Button onClick={this.handleClose} color='black'>No</Button>
          </Modal.Actions>
      </Modal>
    );
  }
}

export default ModalConfirmDelete;
