import React, {Component} from 'react'
import {Button, Input, Modal, Form, Label} from 'semantic-ui-react'

const MultistreamSidebar = props => {
  return (
    <div className="multistream-sidebar">
      <Modal
        trigger={<Button className="sidebar-edit-btn">Edit stream</Button>}
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
      <div>
        <Modal
          trigger={<Button className="sidebar-edit-btn">Share stream </Button>}
          size="tiny"
        >
          <Modal.Header>
            Copy the link below and share it with your friends! so you can share
            it!
          </Modal.Header>
          <Modal.Description className="customize-form-box">
            <Label>{window.location.href}</Label>
          </Modal.Description>
        </Modal>
      </div>
    </div>
  )
}
export default MultistreamSidebar
