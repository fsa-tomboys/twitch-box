import React from 'react'
import {Button, Header, Image, Modal} from 'semantic-ui-react'
import {connect} from 'react-redux'

class ProfileModal extends React.Component {
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
        trigger={
          <div className="login-user-selfview-menu">
            <Button onClick={this.handleOpen}>View My Profile</Button>
          </div>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        // basic
        // size='small'
      >
        <Header content={`Profile of ${this.props.user.name}:`} />
        <Modal.Content image>
          <Image
            wrapped
            size="medium"
            src={this.props.userTwitchInfo.twitchUser.logo}
          />
          <Modal.Description>
            <p>Name: {this.props.userTwitchInfo.twitchUser.name}</p>
            <p>Twitch ID: {this.props.userTwitchInfo.twitchUser._id}</p>
            <p>Type: {this.props.userTwitchInfo.twitchUser.type}</p>
            <p>Created at: {this.props.userTwitchInfo.twitchUser.created_at}</p>
            <p>Updated at: {this.props.userTwitchInfo.twitchUser.updated_at}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            Close Profile
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    userTwitchInfo: state.userTwitchInfo
  }
}

export default connect(mapStateToProps)(ProfileModal)