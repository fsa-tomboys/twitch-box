import React from 'react'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import {Grid} from 'semantic-ui-react'

export const Test = () => {
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

export default Test
