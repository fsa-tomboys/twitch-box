import React, {Component} from 'react'
import {Button, Input, Modal, Form} from 'semantic-ui-react'

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
            Click the link below to copy it to your clipboard so you can share
            it!
          </Modal.Header>
          <Modal.Description className="customize-form-box">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
              }}
            >
              {window.location.href}
            </Button>
          </Modal.Description>
        </Modal>
      </div>
    </div>
  )
}
export default MultistreamSidebar
