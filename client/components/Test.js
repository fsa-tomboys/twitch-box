import React, {Component} from 'react'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import {Grid} from 'semantic-ui-react'
import TwitchClient from 'twitch'

export class Test extends Component {
  constructor() {
    super()
    this.makeClient = this.makeClient.bind(this)
  }
  async makeClient() {
    console.log(process.env.TWITCH_SECRET)
    const twitchClient = await TwitchClient.withCredentials(
      'wpp8xoz167jt0vnmlmko398h4g8ydh',
      process.env.TWITCH_SECRET
    )
    const user = await twitchClient.kraken.users.getUserByName('orb')
    console.log(user)
  }

  render() {
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
}
