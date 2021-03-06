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
    let dateCreated
    if (this.props.userTwitchInfo.twitchUser.created_at) {
      dateCreated = this.props.userTwitchInfo.twitchUser.created_at.slice(0, 10)
    }
    let d = this.props.user.time
    var h = Math.floor(d / 3600)
    var m = Math.floor((d % 3600) / 60)
    var s = Math.floor((d % 3600) % 60)

    var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : ''
    var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : ''
    var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : ''
    return (
      <Modal
        size="tiny"
        trigger={
          <div className="login-user-selfview-menu">
            <p onClick={this.handleOpen}>View My Profile</p>
          </div>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header content="My profile" />
        <Modal.Content image>
          <Image
            wrapped
            size="tiny"
            src={this.props.userTwitchInfo.twitchUser.logo}
          />
          <Modal.Description>
            <p>Name: {this.props.userTwitchInfo.twitchUser.name}</p>
            <p>Twitch ID: {this.props.userTwitchInfo.twitchUser._id}</p>
            <p>Type: {this.props.userTwitchInfo.twitchUser.type}</p>
            <p>Member since {dateCreated}</p>
            <p>
              Time spent watching multistreams: {hDisplay + mDisplay + sDisplay}
            </p>
            <p>
              Your widget url: {window.location.origin}/widget/?name={
                this.props.userTwitchInfo.twitchUser.name
              }
            </p>
          </Modal.Description>
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

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    userTwitchInfo: state.userTwitchInfo
  }
}

export default connect(mapStateToProps)(ProfileModal)
