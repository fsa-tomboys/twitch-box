import React, {Component} from 'react'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import {Grid, Image, Card, Button} from 'semantic-ui-react'
import TwitchClient from 'twitch'
import axios from 'axios'

export class Featured extends Component {
  constructor() {
    super()
    this.state = {
      featuredVids: [],
      selected: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.routeChange = this.routeChange.bind(this)
    this.resetState = this.resetState.bind(this)
  }
  routeChange() {
    this.props.history.push({
      pathname: '/home',
      state: {testArray: this.state.selected}
    })
  }
  resetState() {
    this.setState({
      selected: []
    })
  }
  async componentDidMount() {
    const client = await TwitchClient.withCredentials(
      'wpp8xoz167jt0vnmlmko398h4g8ydh',
      process.env.TWITCH_SECRET
    )
    let snake = await axios.get(
      'https://api.twitch.tv/kraken/streams/featured?limit=10',
      {
        headers: {'Client-ID': 'wpp8xoz167jt0vnmlmko398h4g8ydh'}
      }
    )
    this.setState({
      featuredVids: snake.data.featured
    })
  }

  handleClick(element) {
    let newArr = this.state.selected
    if (newArr.includes(element.stream.channel.name)) {
      newArr.splice(newArr.indexOf(element.stream.channel.name), 1)
    } else {
      newArr.push(element.stream.channel.name)
    }

    this.setState({
      selected: newArr
    })
    console.log(this.state)
  }
  render() {
    return (
      <div>
        <br />
        <Grid>
          {this.state.featuredVids.map(element => {
            return (
              <Image
                src={element.image}
                className={
                  this.state.selected.includes(element.stream.channel.name)
                    ? 'selected'
                    : 'unselected'
                }
                onClick={() => this.handleClick(element)}
              />
            )
          })}
        </Grid>
        <br />
        <div className="customize-form-buttons-box">
          <Button onClick={this.resetState}>Clear</Button>
          <Button onClick={this.routeChange}>Watch Streams</Button>
        </div>
      </div>
    )
  }
}
