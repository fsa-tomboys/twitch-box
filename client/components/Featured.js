import React, {Component} from 'react'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import {connect} from 'react-redux'
import {Grid, Image, Button, Divider, Select} from 'semantic-ui-react'
import axios from 'axios'
import {fetchTwitchUser, fetchUserChannels} from '../store/usertwitchinfo'
import RandomMultistream from './RandomMultiStream'
import {ECONNABORTED} from 'constants'

function randomNumerGenerator(maxNum) {
  let randNums = []
  while (randNums.length < maxNum) {
    let num = Math.floor(Math.random() * 20) + 1
    if (randNums.indexOf(num) === -1) {
      randNums.push(num)
    }
  }
  return randNums
}

class Featured extends Component {
  constructor(props) {
    super(props)
    this.state = {
      testArray: [],
      topGames: [],
      displayChannelsFromTopGames: [],
      selected: [],
      randomChannels: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.routeChange = this.routeChange.bind(this)
    this.resetState = this.resetState.bind(this)
    this.getChannelsForThisGame = this.getChannelsForThisGame.bind(this)
    this.goToRandomMultistream = this.goToRandomMultistream.bind(this)
  }
  routeChange() {
    this.props.history.push({
      pathname: '/home?list=' + this.state.selected.join('-'),
      state: {testArray: this.state.selected}
    })
    axios.post('/api/streams', {
      link: '/home?list=' + this.state.selected.join('-')
    })

    // console.log('button clicked',this.state)
  }
  goToRandomMultistream() {
    let newRandomStream = randomNumerGenerator(3)

    newRandomStream.map(channelNum =>
      this.state.selected.push(
        this.state.testArray[channelNum].stream.channel.name
      )
    )
    this.routeChange()
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
      testArray: featuredChannels.data.featured,
      topGames: topGamesToDisplay,
      randomChannels: randomNumerGenerator(5)
    })

    await this.props.fetchInitialTwitchUser(this.props.user.twitchId)
    await this.props.fetchInitialChannels(this.props.user.twitchId)
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
    let findGame = value.split(' ').join('+')

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
    let windowWidth = window.innerWidth

    let randStreamWidth = Math.floor((windowWidth - windowWidth * 0.5) / 5)
    let randStreamHeight = randStreamWidth * 1.5

    return (
      <div className="landing-main-container">
        <div className="login-welcome-title">
          <h3>Welcome, {this.props.user.name}!</h3>
        </div>
        <h4>Your followed channels: </h4>
        <div className="followed-channels-container">
          <Grid>
            {this.props.userTwitchInfo.channels.length > 0 &&
              this.props.userTwitchInfo.channels.map((ch, idx) => (
                <div key={ch._data.channel._id}>
                  <Image
                    size="small"
                    src={ch._data.channel.logo}
                    className={
                      this.state.selected.includes(ch._data.channel.name)
                        ? 'selected'
                        : 'unselected'
                    }
                    onClick={() => this.handleClick(ch._data.channel.name)}
                  />
                  {this.props.userTwitchInfo.isOnline[idx] ? (
                    <div>
                      <span>Live</span>
                    </div>
                  ) : (
                    <div>
                      <span>Offline</span>
                    </div>
                  )}
                </div>
              ))}
          </Grid>
        </div>
        <Divider hidden />

        <div className="random-single-stream-outer">
          <Grid>
            {!(this.state.randomChannels.length === 0) ? (
              this.state.randomChannels.map((channelNum, index) => {
                return (
                  <RandomMultistream
                    name={this.state.testArray[channelNum].stream.channel.name}
                    key={this.state.testArray[channelNum]._id}
                    index={index}
                    width={randStreamWidth}
                    height={randStreamHeight}
                  />
                )
              })
            ) : (
              <p />
            )}
          </Grid>
        </div>
        <Button primary onClick={this.goToRandomMultistream}>
          Go to random multistream
        </Button>
        <h4>Top streamers</h4>
        <Divider hidden />
        <Grid>
          {this.state.testArray.map(element => {
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

const mapStateToProps = state => {
  return {
    user: state.user,
    userTwitchInfo: state.userTwitchInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialTwitchUser: id => dispatch(fetchTwitchUser(id)),
    fetchInitialChannels: id => dispatch(fetchUserChannels(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Featured)
