import React, {Component} from 'react'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import {Grid} from 'semantic-ui-react'
import TwitchClient from 'twitch'
import axios from 'axios'

export class Test extends Component {
  constructor() {
    super()
    this.makeClient = this.makeClient.bind(this)
  }
  async makeClient() {
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
    for await (const video of snake.data.featured) {
      console.log(video.title)
    }
  }

  render() {
    this.makeClient()
    return (
      <div>
        <Grid>
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
        </Grid>
      </div>
    )
  }
}
