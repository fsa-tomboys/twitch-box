import React from 'react'
import {Button, Header, Modal} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Customize} from '../Customize'

class CustomizeModal extends React.Component {
  constructor() {
    super()
    this.state = {modalOpen: false}
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleOpen = () => this.setState({modalOpen: true})
  handleClose = () => this.setState({modalOpen: false})

  render() {
    return (
      <Modal
        size="mini"
        trigger={
          <div>
            <Button onClick={this.handleOpen}>Add by stream name</Button>
          </div>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header content="Add streams by name" />
        <Modal.Content>
          <Customize />
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    userTwitchInfo: state.userTwitchInfo,
    multistreams: state.multistreams
  }
}

export default connect(mapStateToProps)(CustomizeModal)
