import React, {Component} from 'react'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import {Grid} from 'semantic-ui-react'
import TwitchClient from 'twitch'
import axios from 'axios'

export class Featured extends Component {
  constructor() {
    super()
    this.state = {
      featuredVids: []
    }
    // this.makeClient = this.makeClient.bind(this)
  }
  async componentDidMount() {
    const client = await TwitchClient.withCredentials(
      'wpp8xoz167jt0vnmlmko398h4g8ydh',
      process.env.TWITCH_SECRET
    )
    const user = await client.kraken.users.getUserByName('orb')
    console.log(user)
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

  render() {
    return (
      <div>
        {this.state.featuredVids.map(function(element) {
          return <img src={element.image} />
        })}
        {/* <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <ReactTwitchEmbedVideo channel="talk2megooseman" />
            </Grid.Column>
            <Grid.Column width={8}>
              <ReactTwitchEmbedVideo channel="talk2megooseman" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              <ReactTwitchEmbedVideo channel="talk2megooseman" />
            </Grid.Column>
            <Grid.Column width={8}>
              <ReactTwitchEmbedVideo channel="talk2megooseman" />
            </Grid.Column>
          </Grid.Row>
        </Grid> */}
      </div>
    )
  }
}
