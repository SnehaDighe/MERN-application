import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import FormUser from './FormUser.jsx';

class ModalUser extends Component {

  render() {
    return (
      <Modal
        trigger={<Button color={this.props.buttonColor}>{this.props.buttonTriggerTitle}</Button>}
        dimmer='inverted'
        size='tiny'
      >
        <Modal.Header>{this.props.headerTitle}</Modal.Header>
        <Modal.Content>
          <FormUser
            buttonSubmitTitle={this.props.buttonSubmitTitle}
            buttonColor={this.props.buttonColor}
            userID={this.props.userID}
            onUserAdded={this.props.onUserAdded}
            onUserUpdated={this.props.onUserUpdated}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalUser;
