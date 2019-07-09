import React, {Component} from 'react'
import {
  Button,
  Input,
  Modal,
  Form,
  Label,
  Divider,
  Icon,
  Image
} from 'semantic-ui-react'
import TwitchClient from 'twitch'
import {connect} from 'react-redux'
import {createClip} from '../store/clip'

class MultistreamSidebar extends Component {
  constructor() {
    super()
    this.state = {
      userTwitchInfo: [],
      modalOpen: false,
      time: 0
    }
    this.createMultistreamClip = this.createMultistreamClip.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  // async
  async createMultistreamClip(event) {
    console.log('before', this.props.clips)
    let clipsArrayBefore = this.props.clips
    let clipName = event.target.streamName.value
    const client = await TwitchClient.withCredentials(
      'bmeab5l8jv7arn07ucv4zywa22qrl9',
      this.props.userTwitchInfo.token
    )
    this.handleClose()
    document.getElementById('creating').style.display = 'block'
    let clipArray = []
    for (let i = 0; i < this.props.channelIds.length; i++) {
      const clipId = await client.helix.clips.createClip({
        channelId: this.props.channelIds[i]
      })
      clipArray.push(clipId)
      // console.log(clipId)
    }
    // let clipName = clipNamePopup()
    // console.log('CLIP ', clipArray)
    await this.props.addClip(
      clipArray.join(','),
      this.props.userTwitchInfo.id,
      clipName
    )
    let clipsArrayAfter = this.props.clips
    if (
      clipsArrayBefore.length < clipsArrayAfter.length &&
      clipsArrayAfter[clipsArrayAfter.length - 1].clips !== ''
    ) {
      document.getElementById('creating').style.display = 'none'
      document.getElementById('success').style.display = 'block'
      setTimeout(function() {
        document.getElementById('success').style.display = 'none'
      }, 2500)
    } else {
      document.getElementById('success').style.display = 'none'
      document.getElementById('creating').style.display = 'none'
      document.getElementById('error').style.display = 'block'
      setTimeout(function() {
        document.getElementById('error').style.display = 'none'
      }, 2500)
    }
  }

  handleOpen() {
    this.setState({modalOpen: true})
  }
  handleClose() {
    this.setState({modalOpen: false})
  }

  render() {
    console.log('>>>>>>>>>', this.props)
    return (
      <div className="multistream-sidebar">
        <div id="success">
          <span>
            <img src="/image/s.png" alt="success" height="42" width="42" />
            <p>The clip was created successfully!</p>
          </span>
        </div>
        <div id="creating">
          <span>
            <img
              src="/image/loading2.gif"
              alt="the clip is being created"
              height="42"
              width="42"
            />
            <p>Hold tight, the clip is being created...</p>
          </span>
        </div>

        <div id="error">
          <span>
            <img src="/image/e.png" alt="error" height="42" width="42" />
            <p>The was an error, please try again.</p>
          </span>
        </div>
        <Divider hidden />
        <Modal
          trigger={
            <Button inverted size="small">
              <Icon name="edit" /> Edit
            </Button>
          }
          // trigger={<Button className="sidebar-edit-btn">Edit</Button>}
          // trigger={<Icon className="edit-icon-sidebar"name="edit outline" color="black" size="big">Here</Icon>}
          size="tiny"
        >
          <Modal.Header>Edit Streams</Modal.Header>
          <Modal.Description className="customize-form-box">
            {this.props.testArray.map(element => (
              <div>
                <Button
                  animated
                  onClick={() => this.props.remove(element)}
                  disabled={this.props.testArray.length === 1}
                >
                  <Button.Content visible>{element}</Button.Content>
                  <Button.Content hidden>Remove</Button.Content>
                </Button>
              </div>
            ))}
            <Form onSubmit={this.props.addStream}>
              <Form.Field>
                <Input type="text" name="newStream" />
              </Form.Field>
              <Button type="submit">Add stream</Button>
            </Form>
          </Modal.Description>
        </Modal>
        <div>
          <Divider hidden />
          <Modal
            trigger={
              <Button inverted size="small">
                <Icon name="share square outline" /> Share
              </Button>
            }
            size="tiny"
          >
            <Modal.Header>
              <span>Copy the link below and share it with your friends!</span>
            </Modal.Header>
            <Modal.Description className="customize-form-box">
              <Label>{window.location.href}</Label>
            </Modal.Description>
          </Modal>
        </div>
        <Divider hidden />
        {this.props.userTwitchInfo.length > 0 ? (
          <Modal
            open={this.state.modalOpen}
            onClose={this.handleClose}
            trigger={
              <Button inverted onClick={this.handleOpen} size="small">
                <Icon name="record" /> Record Clip
              </Button>
            }
            size="mini"
          >
            <Modal.Header>Enter Clip Name:</Modal.Header>
            <Modal.Description className="customize-form-box">
              <Form onSubmit={this.createMultistreamClip}>
                <Form.Field>
                  <Input type="text" name="streamName" />
                </Form.Field>{' '}
                {'   '}
                <span className="create-clip-button">
                  <Button
                    inverted
                    color="green"
                    type="submit"
                    onSubmit={this.createMultistreamClip}
                  >
                    Create
                  </Button>
                </span>
              </Form>
            </Modal.Description>
          </Modal>
        ) : (
          <p />
        )}
        {/* <Modal
          trigger={
            <Button
              className="sidebar-edit-btn"
              onClick={() => {
                let currentTime = this.props.getTime()
                this.setState({
                  time: currentTime
                })
              }}
            >
              Get Time{' '}
            </Button>
          }
          size="tiny"
        > */}
        {/* <Modal.Description className="customize-form-box">
            <Label>
              Seconds watched of this multistream: {this.state.time}
            </Label>
          </Modal.Description> */}
        {/* </Modal> */}
        {/* <Button>Show/hide Chat</Button> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userTwitchInfo: state.user,
    clips: state.clip
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addClip: (clip, id, name) => dispatch(createClip(clip, id, name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultistreamSidebar)
