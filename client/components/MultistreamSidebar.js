import React, {Component} from 'react'
import {Button, Header, Input, Modal, Form} from 'semantic-ui-react'

const MultistreamSidebar = props => {
  return (
    <div className="multistream-sidebar">
      <Modal
        trigger={
          <button className="sidebar-edit-btn">
            <i className="fab fa-twitch" />
          </button>
        }
        size="tiny"
      >
        <Modal.Header>Edit Streams</Modal.Header>
        <Modal.Description className="customize-form-box">
          {props.testArray.map(element => (
            <div>
              <Button
                animated
                onClick={() => props.remove(element)}
                disabled={props.testArray.length === 1}
              >
                <Button.Content visible>{element}</Button.Content>
                <Button.Content hidden>Remove</Button.Content>
              </Button>
            </div>
          ))}
          <Form onSubmit={props.addStream}>
            <Form.Field>
              <Input type="text" name="newStream" />
            </Form.Field>
            <Button type="submit">Add stream</Button>
          </Form>
        </Modal.Description>
      </Modal>
    </div>
  )
}
export default MultistreamSidebar
