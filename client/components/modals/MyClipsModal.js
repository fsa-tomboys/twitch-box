import React from 'react'
import {Button, Header, Image, Modal, List} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {fetchTwitchUser} from '../../store/usertwitchinfo'
import {fetchClips} from '../../store/clip'

class MyClipsModal extends React.Component {
  constructor() {
    super()
    this.state = {
      modalOpen: false,
      clips: []
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.routeChange = this.routeChange.bind(this)
  }
  handleOpen = () => this.setState({modalOpen: true})
  handleClose = () => this.setState({modalOpen: false})

  componentDidMount() {
    this.setState({
      clips: this.props.clips
    })
  }
  routeChange(elem) {
    // console.log('EVENT', elem)
    let clipArray = elem.clips
    // console.log('this.props ',clipArray.split(',').join('-'))
    this.props.history.push({
      pathname: '/clips?list=' + clipArray.split(',').join('-')
    })
    this.setState({
      clips: elem.clips.split(',')
    })
  }

  render() {
    // console.log('In my clips modal', this.props)
    if (this.props.clips.length === 0) {
      this.props.fetchInitialTwitchUser(this.props.user.twitchId)
      this.props.fetchInitialClips(this.props.user.id)
    }
    return (
      <Modal
        trigger={
          <div className="login-user-selfview-menu">
            <p onClick={this.handleOpen}>View My Clips</p>
          </div>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        // basic
        size="tiny"
      >
        <Header content="My clips" />
        <Modal.Content image>
          <Image
            wrapped
            size="tiny"
            src={this.props.userTwitchInfo.twitchUser.logo}
          />
          <Modal.Description>
            <List>
              {this.props.clips.map(elem => (
                <List.Item key={elem.id}>
                  <span>
                    <a
                      onClick={() => {
                        this.routeChange(elem)
                      }}
                    >
                      Clip: {elem.name}, created on{' '}
                      {elem.createdAt.slice(0, 10)}
                    </a>
                  </span>
                </List.Item>
              ))}
            </List>
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
    user: state.user,
    userTwitchInfo: state.userTwitchInfo,
    clips: state.clip
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialTwitchUser: id => dispatch(fetchTwitchUser(id)),
    fetchInitialClips: userId => dispatch(fetchClips(userId))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyClipsModal)
)
