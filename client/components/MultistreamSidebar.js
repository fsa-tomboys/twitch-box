import React, {Component} from 'react'
import {Button, Input, Modal, Form, Label} from 'semantic-ui-react'
import TwitchClient from 'twitch'
import {connect} from 'react-redux'
import {createClip} from '../store/clip'

// const MultistreamSidebar = props => {
class MultistreamSidebar extends Component {
  constructor() {
    super()
    this.state = {
      userTwitchInfo: []
    }
    this.createMultistreamClip = this.createMultistreamClip.bind(this)
  }

  async createMultistreamClip(ids) {
    const client = await TwitchClient.withCredentials(
      'bmeab5l8jv7arn07ucv4zywa22qrl9',
      this.props.userTwitchInfo.token
    )
    let clipArray = []
    for (let i = 0; i < ids.length; i++) {
      const clipId = await client.helix.clips.createClip({channelId: ids[i]})
      clipArray.push(clipId)
      // console.log(clipId)
    }

    await this.props.addClip(clipArray.join(','), this.props.userTwitchInfo.id)
  }
  // console.log('sidebar props ', props)
  render() {
    return (
      <div className="multistream-sidebar">
        <Modal
          trigger={<Button className="sidebar-edit-btn">Edit stream</Button>}
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
          <Modal
            trigger={
              <Button className="sidebar-edit-btn">Share stream </Button>
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
        <Button
          onClick={() => {
            this.createMultistreamClip(this.props.channelIds)
          }}
        >
          Record Clip
        </Button>
        <Button
          onClick={() => {
            this.props.getTime()
          }}
        >
          Get Time
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userTwitchInfo: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addClip: (clip, id) => dispatch(createClip(clip, id))
  }
}
// export default MultistreamSidebar

export default connect(mapStateToProps, mapDispatchToProps)(MultistreamSidebar)
