import React from 'react'
import {Button, Header, Image, Modal, Label} from 'semantic-ui-react'

class AboutModal extends React.Component {
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
        size="small"
        trigger={
          <div className="login-user-selfview-menu">
            <p onClick={this.handleOpen}>About/Contact</p>
          </div>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        // basic
        // size='small'
      >
        {/* <Header content={`Profile of ${this.props.user.name}:`} /> */}
        <Header content="About this APP" />
        <Modal.Content>
          <div>
            This is Twitch Box, an application designed to help make watching
            multiple Twitch streams with an easier process. This application was
            made by TOMboys(maxgrosshandler, olgashi, and taowang6000). You can
            find them all on Github. This project was made using React, Redux,
            Express, Sequelize, Node.js, and Socket.io. You can contact us with
            questions/concerns/bug reports at twitchboxapp@gmail.com
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.handleClose} inverted>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default AboutModal
