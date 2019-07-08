import React from 'react'
import {Button, Header, Image, Modal, List} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {fetchTwitchUser} from '../../store/usertwitchinfo'
import {fetchMultistreams} from '../../store/multistreams'

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
    // console.log('this.props: ', this.props)
    if (this.props.multistreams.length === 0) {
      this.props.fetchInitialTwitchUser(this.props.user.twitchId)
      this.props.fetchInitialMs(this.props.user.id)
    }
    return (
      <Modal
        trigger={
          <div className="login-user-selfview-menu">
            <p onClick={this.handleOpen}>Multistream history</p>
          </div>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        // basic
        // size='small'
      >
        <Header content="My multistreams" />
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
                  <a href={elem.link}>
                    {' '}
                    {' - '}{' '}
                    {elem.link
                      .slice(11, -1)
                      .split('-')
                      .join(',')}
                  </a>
                </List.Item>
              ))}
            </List>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            Close
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

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialTwitchUser: id => dispatch(fetchTwitchUser(id)),
    fetchInitialMs: userId => dispatch(fetchMultistreams(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultistreamModal)
