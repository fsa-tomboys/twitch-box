import React, {Component} from 'react'
import {Grid, Image, Button, Divider, Select} from 'semantic-ui-react'
import axios from 'axios'

export class Featured extends Component {
  constructor() {
    super()
    this.state = {
      featuredVids: [],
      topGames: [],
      displayChannelsFromTopGames: [],
      selected: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.routeChange = this.routeChange.bind(this)
    this.resetState = this.resetState.bind(this)
    this.getChannelsForThisGame = this.getChannelsForThisGame.bind(this)
  }
  routeChange() {
    this.props.history.push({
      pathname: '/home?list=' + this.state.selected.join('-'),
      state: {testArray: this.state.selected}
    })
    axios.post('/api/streams', {
      link: '/home?list=' + this.state.selected.join('-')
    })
  }
  resetState() {
    this.setState({
      selected: []
    })
  }
  async componentDidMount() {
    let featuredChannels = await axios.get(
      'https://api.twitch.tv/kraken/streams/featured?limit=40',
      {
        headers: {'Client-ID': 'wpp8xoz167jt0vnmlmko398h4g8ydh'}
      }
    )

    let topGames = await axios.get(
      'https://api.twitch.tv/helix/games/top?first=30',
      {
        headers: {'Client-ID': 'wpp8xoz167jt0vnmlmko398h4g8ydh'}
      }
    )
    let topGamesToDisplay = topGames.data.data

    this.setState({
      featuredVids: featuredChannels.data.featured,
      topGames: topGamesToDisplay
    })
  }

  handleClick(channelName) {
    let newArr = this.state.selected
    if (newArr.includes(channelName)) {
      newArr.splice(newArr.indexOf(channelName), 1)
    } else {
      newArr.push(channelName)
    }

    this.setState({
      selected: newArr
    })
  }
  async getChannelsForThisGame(event, {value}) {
    let findGame = value.split(' ').join(',')

    let channelsForThisGame = await axios.get(
      `https://api.twitch.tv/kraken/streams?game=${findGame}`,
      {
        headers: {'Client-ID': 'wpp8xoz167jt0vnmlmko398h4g8ydh'}
      }
    )
    this.setState({
      displayChannelsFromTopGames: channelsForThisGame.data.streams
    })
  }

  render() {
    return (
      <div>
        <h4>Top streamers</h4>
        <Divider hidden />
        <Grid>
          {this.state.featuredVids.map(element => {
            return (
              <Image
                size="small"
                src={element.image}
                className={
                  this.state.selected.includes(element.stream.channel.name)
                    ? 'selected'
                    : 'unselected'
                }
                onClick={() => this.handleClick(element.stream.channel.name)}
              />
            )
          })}
        </Grid>
        <Divider hidden />
        <Divider hidden />
        <h4>Streamers by game</h4>
        <Divider hidden />
        <Divider hidden />
        <Select
          placeholder="Browse by Game"
          onChange={this.getChannelsForThisGame}
          options={this.state.topGames.map(game => ({
            key: game.id,
            text: game.name,
            value: game.name
          }))}
        />
        <Divider hidden />
        <Grid>
          {!(this.state.displayChannelsFromTopGames.length === 0) ? (
            this.state.displayChannelsFromTopGames.map(gameChannel => {
              return (
                <Image
                  size="small"
                  src={gameChannel.channel.logo}
                  className={
                    this.state.selected.includes(gameChannel.channel.name)
                      ? 'selected'
                      : 'unselected'
                  }
                  onClick={() => this.handleClick(gameChannel.channel.name)}
                />
              )
            })
          ) : (
            <p />
          )}
        </Grid>
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <div className="customize-form-buttons-box">
          <Button onClick={this.resetState}>Clear</Button>
          <Button onClick={this.routeChange}>Watch Streams</Button>
        </div>
      </div>
    )
  }
}
