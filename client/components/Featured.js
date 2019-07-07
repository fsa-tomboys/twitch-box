/* eslint-disable react/jsx-key */
import React, {Component} from 'react'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import {connect} from 'react-redux'
import {Grid, Image, Button, Divider, Select, Icon} from 'semantic-ui-react'
import axios from 'axios'
import {
  fetchTwitchUser,
  fetchUserChannels,
  fetchChannelsStreamsStatus
} from '../store/usertwitchinfo'
import {createMultistream, fetchMultistreams} from '../store/multistreams'
import {fetchClips} from '../store/clip'
import {createUserMultistreamAssociation} from '../store/users'
import RandomMultistream from './RandomMultiStream'
import {ECONNABORTED} from 'constants'
import ProfileModal from './modals/profileModal'
import MultistreamModal from './modals/multistreamModal'
import CustomizeModal from './modals/customizeModal'

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
function convertFollowers(num) {
  if (num < 1000) {
    return String(num)
  } else if (num / 1000 > 1000 && num / 1000 < 1000000) {
    return String((num / 1000000).toFixed(2)) + 'm'
  } else {
    return String(Math.round(num / 1000)) + 'k'
  }
}

function processStreamDescription(streamText) {
  let result = streamText.slice(3).split('</p>')
  return result
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
    this.resetSelected = this.resetSelected.bind(this)
    this.getChannelsForThisGame = this.getChannelsForThisGame.bind(this)
    this.goToRandomMultistream = this.goToRandomMultistream.bind(this)
  }
  async routeChange() {
    this.props.history.push({
      pathname: '/home?list=' + this.state.selected.join('-'),
      state: {testArray: this.state.selected}
    })
    // For a logged in user, save the multistream into database
    if (this.props.isLoggedIn) {
      await this.props.addMultistream({
        link: '/home?list=' + this.state.selected.join('-'),
        userId: this.props.user.id
      })
    }
  }
  goToRandomMultistream() {
    this.state.randomChannels.map(channelNum =>
      this.state.selected.push(
        this.state.testArray[channelNum].stream.channel.name
      )
    )
    this.routeChange()
    this.resetSelected()
  }
  resetSelected() {
    this.setState({
      selected: []
    })
  }
  async componentDidMount() {
    let featuredChannels = await axios.get(
      'https://api.twitch.tv/kraken/streams/featured?limit=25',
      {
        headers: {'Client-ID': 'wpp8xoz167jt0vnmlmko398h4g8ydh'}
      }
    )

    let topGames = await axios.get(
      'https://api.twitch.tv/helix/games/top?first=20',
      {
        headers: {'Client-ID': 'wpp8xoz167jt0vnmlmko398h4g8ydh'}
      }
    )
    let topGamesToDisplay = topGames.data.data

    this.setState({
      testArray: featuredChannels.data.featured,
      topGames: topGamesToDisplay,
      randomChannels: randomNumerGenerator(4)
    })
    if (this.props.isLoggedIn) {
      await this.props.fetchInitialTwitchUser(this.props.user.twitchId)
      await this.props.fetchInitialChannels(this.props.user.twitchId)
      await this.props.fetchChannelsStatus(this.props.userTwitchInfo.channels)
      await this.props.fetchInitialMs(this.props.user.id)
      await this.props.fetchInitialClips(this.props.user.id)
    }
  }

  async handleClick(channelName) {
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
  async getChannelsForThisGame(value) {
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
    console.log('PROPS', this.props)
    return (
      <div className="main-layout-wrapper-featured">
        <div className="sidebar-featured">
          <a
            className="featured-sidebar-link"
            onClick={this.goToRandomMultistream}
          >
            Go to random Multistream
          </a>
          <CustomizeModal />

          {this.props.isLoggedIn && (
            <div className="followed-channels-wrapper">
              <Divider />
              <h4>Channels you follw: </h4>
              <Divider hidden />
              <div>
                <Grid>
                  {this.props.userTwitchInfo.channels.length > 0 ? (
                    this.props.userTwitchInfo.channels.map((ch, idx) => (
                      <div
                        // className="followed-channels-icons"
                        key={ch._data.channel._id}
                        className={
                          this.state.selected.includes(ch._data.channel.name)
                            ? 'selected'
                            : 'unselected'
                        }
                        onClick={() => this.handleClick(ch._data.channel.name)}
                      >
                        <Image
                          // size="tiny"
                          avatar
                          src={ch._data.channel.logo}
                          // className={
                          //   this.state.selected.includes(
                          //     ch._data.channel.name
                          //     )
                          //     ? 'selected'
                          //     : 'unselected'
                          //   }
                          // onClick={() =>
                          //   this.handleClick(ch._data.channel.name)
                          // }
                        />
                        <span className="followed-channels-icon-channelName">
                          {ch._data.channel.name}
                        </span>
                        {this.props.userTwitchInfo.isOnline[idx] ? (
                          <div>
                            <span className="channel-online">Live</span>
                          </div>
                        ) : (
                          <div>
                            <span className="channel-offline">Offline</span>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div>
                      <Image src="/image/loading.gif" />
                    </div>
                  )}
                </Grid>
              </div>
            </div>
          )}
          <Divider />
          <h4>Channels by top games: </h4>
          <Divider hidden />

          <ul>
            {this.state.topGames.map(game => (
              <a
                className="top-games-link"
                onClick={() => {
                  this.getChannelsForThisGame(game.name)
                }}
              >
                <li> {game.name}</li>
              </a>
            ))}
          </ul>
        </div>
        <div className="main-inner-featured">
          <div>
            {this.props.isLoggedIn ? (
              <div className="login-welcome-title">
                <h4>
                  Welcome{' '}
                  <span className="username-featured">
                    {this.props.user.name}
                  </span>, click on stream icons to select streams to watch.
                </h4>
              </div>
            ) : (
              <div className="login-welcome-title">
                <h3>
                  Welcome visitor, click on channel icons to select streams to
                  watch.
                </h3>
              </div>
            )}
            <div className="customize-form-buttons-box">
              <Button onClick={this.resetSelected}>Clear</Button>
              <Button
                color="purple"
                onClick={this.routeChange}
                disabled={this.state.selected.length === 0}
              >
                Watch Streams
              </Button>
            </div>
            {/* <Button primary onClick={this.goToRandomMultistream}>
              Random multistream
            </Button> */}
          </div>
          <Divider regular />

          <h4>Featured Channels</h4>
          <Grid>
            {this.state.testArray.map(element => {
              return (
                <div className="featured-streams-icons">
                  <span className="featured-streams-icon-channelName">
                    {element.stream.channel.name}
                  </span>
                  <Image
                    size="tiny"
                    // src={element.stream.preview.small}
                    src={element.image}
                    className={
                      this.state.selected.includes(element.stream.channel.name)
                        ? 'selected'
                        : 'unselected'
                    }
                    onClick={() =>
                      this.handleClick(element.stream.channel.name)
                    }
                  />
                  <span>
                    {convertFollowers(element.stream.channel.followers)}{' '}
                    followers
                  </span>
                  <span className="featured-streams-icons-tooltiptext">
                    {processStreamDescription(element.text)}
                  </span>
                </div>
              )
            })}
          </Grid>
          <Divider hidden />
          <Divider hidden />
          <h4>Streamers by game</h4>
          <Divider hidden />
          <Divider hidden />
          {/* <Select
            placeholder="Browse by Game"
            onChange={this.getChannelsForThisGame}
            options={this.state.topGames.map(game => ({
              key: game.id,
              text: game.name,
              value: game.name
            }))}
          /> */}
          <Divider hidden />
          <Grid>
            {!(this.state.displayChannelsFromTopGames.length === 0) ? (
              this.state.displayChannelsFromTopGames.map(gameChannel => {
                return (
                  <Image
                    size="tiny"
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
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    userTwitchInfo: state.userTwitchInfo,
    multistreams: state.multistreams,
    clips: state.clip
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialTwitchUser: id => dispatch(fetchTwitchUser(id)),
    fetchInitialChannels: id => dispatch(fetchUserChannels(id)),
    fetchInitialMs: userId => dispatch(fetchMultistreams(userId)),
    fetchInitialClips: userId => dispatch(fetchClips(userId)),
    addMultistream: ms => dispatch(createMultistream(ms)),
    associateUserMs: (userId, msId) =>
      dispatch(createUserMultistreamAssociation(userId, msId)),
    fetchChannelsStatus: channels =>
      dispatch(fetchChannelsStreamsStatus(channels))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Featured)
