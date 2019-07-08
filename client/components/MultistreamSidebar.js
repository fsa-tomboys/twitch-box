import React, {Component} from 'react'
import {
  Button,
  Input,
  Modal,
  Form,
  Label,
  Divider,
  Icon
} from 'semantic-ui-react'
import TwitchClient from 'twitch'
import {connect} from 'react-redux'
import {createClip} from '../store/clip'

// function clipNamePopup() {
//   var today = new Date()
//   var dd = String(today.getDate()).padStart(2, '0')
//   var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
//   var yyyy = today.getFullYear()

//   today = mm + '/' + dd + '/' + yyyy
//   var txt
//   var clipName = prompt('Please enter clip name', `Clip-created-on-${today}`)
//   // if (clipNmae == null || clipName == '') {
//   //   txt = 'User did not enter clip name'
//   // } else {
//   //   txt = 'Hello ' + person + '! How are you today?'
//   // }
//   // document.getElementById('demo').innerHTML = txt
//   return clipName
// }

// const MultistreamSidebar = props => {
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
    let clipName = event.target.streamName.value
    const client = await TwitchClient.withCredentials(
      'bmeab5l8jv7arn07ucv4zywa22qrl9',
      this.props.userTwitchInfo.token
    )
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
  }

  handleOpen() {
    this.setState({modalOpen: true})
    // console.log('Opened')
  }
  handleClose() {
    this.setState({modalOpen: false})
    // console.log('Closed')
  }
  // console.log('sidebar props ', props)
  render() {
    // console.log('PROPS IN SIDEBAR: ', this.props)
    return (
      <div className="multistream-sidebar">
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
              // <Button className="sidebar-edit-btn">Share</Button>
            }
            size="tiny"
          >
            <Modal.Header>
              Copy the link below and share it with your friends! so you can
              share it!
            </Modal.Header>
            <Modal.Description className="customize-form-box">
              <Label>{window.location.href}</Label>
            </Modal.Description>
          </Modal>
        </div>
        <Divider hidden />
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          trigger={
            <Button inverted onClick={this.handleOpen} size="small">
              <Icon name="record" /> Record Clip
            </Button>
          }
          // trigger={<Button onClick={this.handleOpen}>Record Clip</Button>}
          size="tiny"
        >
          <Modal.Header>Enter Clip Name:</Modal.Header>
          <Modal.Description className="customize-form-box">
            <Form onSubmit={this.createMultistreamClip}>
              <Form.Field>
                <Input type="text" name="streamName" />
              </Form.Field>
              <Button type="submit" onSubmit={this.createMultistreamClip}>
                Create clip
              </Button>
            </Form>
          </Modal.Description>
        </Modal>
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
// export default MultistreamSidebar

export default connect(mapStateToProps, mapDispatchToProps)(MultistreamSidebar)
