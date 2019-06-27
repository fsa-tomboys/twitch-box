import React, {Component} from 'react'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import {Button, Header, Input, Modal, Label} from 'semantic-ui-react'
import equal from 'fast-deep-equal'
import SingleStreamComponent from './SingleStreamComponent'
import TwitchClient from 'twitch'
import {Chat} from './chat'

export class Test extends Component {
  constructor() {
    super()
    this.state = {
      width: window.innerHeight,
      height: window.innerHeight,
      testArray: ['orb', 'maxgrosshandler']
    }
    this.updateDimensions = this.updateDimensions.bind(this)
    this.remove = this.remove.bind(this)
  }

  updateDimensions() {
    console.log(this.state)
    this.setState({width: window.innerWidth, height: window.innerHeight})
    console.log(this.state)
  }
  remove(element) {
    let arr = this.state.testArray
    var index = arr.indexOf(element)
    if (index !== -1) arr.splice(index, 1)
    this.setState({
      testArray: arr
    })
  }

  componentDidMount() {
    this.updateDimensions()
    this.setState({
      testArray: this.props.location.state.testArray
    })
    window.addEventListener('resize', () => {
      this.updateDimensions()
      // console.log(this.state.width)
      // console.log(this.state.height)
    })
  }

  // componentWillMount() {
  //   this.updateDimensions();
  //   console.log(this.state.width)
  //   console.log(this.state.height)
  // }

  //   componentWillUnmount() {
  //     window.removeEventListener("resize",  this.updateDimensions())

  //     // console.log(this.state)
  // }

  render() {
    // console.log('RENDER:', typeof this.state.width)
    // let newWidth = String(this.state.width)
    // let newHeight = String(this.state.height)
    return (
      <div>
        <Modal trigger={<Button>Edit</Button>}>
          <Modal.Header>Edit Streams</Modal.Header>

          <Modal.Description className="customize-form-box">
            {this.state.testArray.map(element => (
              <div>
                <Button
                  animated
                  disabled={this.state.testArray.length === 1}
                  onClick={() => this.remove(element)}
                >
                  <Button.Content visible>{element}</Button.Content>
                  <Button.Content hidden>Remove</Button.Content>
                </Button>
              </div>
            ))}
          </Modal.Description>
        </Modal>

        <div className="main-layout-container">
          {this.props.location.state.testArray.map(element => (
            <SingleStreamComponent name={element} />
          ))}
          <Chat testArray={this.props.location.state.testArray} />
        </div>
      </div>
    )
  }
}
/* this.makeClient = this.makeClient.bind(this) */
/* } */
/* async makeClient() {
    console.log(process.env.TWITCH_SECRET)
    const twitchClient = await TwitchClient.withCredentials(
      'wpp8xoz167jt0vnmlmko398h4g8ydh',
      process.env.TWITCH_SECRET
    )
    const user = await twitchClient.kraken.users.getUserByName('orb')
    console.log(user)
  // } */

/* render() {
    this.makeClient()
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <ReactTwitchEmbedVideo channel="magikarpUsedFlylol" />
            </Grid.Column>
            <Grid.Column width={8}>
              <ReactTwitchEmbedVideo channel="frostprime_" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
// } */
