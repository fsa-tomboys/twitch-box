import React, {Component} from 'react'
import {Button, Header, Input, Modal, Label} from 'semantic-ui-react'

const MultistreamSidebar = props => {
  console.log(props.testArray)
  return (
    <div className="multistream-sidebar">
      <Modal trigger={<Button>Edit</Button>}>
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
        </Modal.Description>
      </Modal>
    </div>
  )
}
export default MultistreamSidebar
