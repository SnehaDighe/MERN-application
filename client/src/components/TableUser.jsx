import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import ModalUser from './ModalUser.jsx';
import ModalConfirmDelete from './ModalConfirmDelete.jsx';

class TableUser extends Component {

  render() {

    let users = this.props.usersInfo;
    if(users != undefined){
      users = users.map((user) => 
      <Table.Row key={user._id}>
        <Table.Cell>{user.description}</Table.Cell>
        
        <Table.Cell>
          <ModalUser
            headerTitle='Edit User'
            buttonTriggerTitle='Edit'
            buttonSubmitTitle='Save'
            buttonColor='blue'
            userID={user._id}
            onUserUpdated={this.props.onUserUpdated}
          />
          <ModalConfirmDelete
            headerTitle='Delete User'
            buttonTriggerTitle='Delete'
            buttonColor='black'
            user={user}
            onUserDeleted={this.props.onUserDeleted}
          />
        </Table.Cell>
      </Table.Row>
    );
    users =  [...users].reverse();
    }


    // Make every new user appear on top of the list
    

    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            {/* <Table.HeaderCell>Description</Table.HeaderCell> */}
            
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users}
        </Table.Body>
      </Table>
    );
  }
}

export default TableUser;
