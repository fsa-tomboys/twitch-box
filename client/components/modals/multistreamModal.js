import React from 'react'
import {Button, Header, Image, Modal, List} from 'semantic-ui-react'
import {connect} from 'react-redux'

class MultistreamModal extends React.Component {
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
            <p onClick={this.handleOpen}>Multistream History</p>
          </div>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        // basic
        // size='small'
      >
        <Header content={`Multistream history of ${this.props.user.name}:`} />
        <Modal.Content image>
          <Image
            wrapped
            size="medium"
            src={this.props.userTwitchInfo.twitchUser.logo}
          />
          <Modal.Description>
            <List>
              {this.props.multistreams.map(elem => (
                <List.Item key={elem.id}>
                  <a href={elem.link}>{elem.link}</a>
                </List.Item>
              ))}
            </List>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            Close Multistream History
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

export default connect(mapStateToProps)(MultistreamModal)
