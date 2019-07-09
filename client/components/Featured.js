/* eslint-disable react/jsx-key */
import React, {Component} from 'react'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import {connect} from 'react-redux'
import Navbar from './navbar'
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
  var doc = new DOMParser().parseFromString(streamText, 'text/html')
  return doc.body.textContent || ''
}

class Featured extends Component {
  constructor(props) {
    super(props)
    this.state = {
      testArray: [],
      topGames: [],
      displayChannelsFromTopGames: [],
      selected: [],
      randomChannels: [],
      followedStreams: [],
      showMore: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.routeChange = this.routeChange.bind(this)
    this.resetSelected = this.resetSelected.bind(this)
    this.getChannelsForThisGame = this.getChannelsForThisGame.bind(this)
    this.goToRandomMultistream = this.goToRandomMultistream.bind(this)
    this.handleShowMore = this.handleShowMore.bind(this)
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
    // console.log('featured: ', featuredChannels)
    let topGames = await axios.get(
      'https://api.twitch.tv/helix/games/top?first=10',
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
      await this.props.fetchInitialMs(this.props.user.id)
      await this.props.fetchInitialClips(this.props.user.id)
      let theStreams = await axios.get(
        'https://api.twitch.tv/kraken/streams/followed',
        {
          headers: {
            Accept: 'application/vnd.twitchtv.v5+json',
            'Client-ID': 'wpp8xoz167jt0vnmlmko398h4g8ydh',
            Authorization: `OAuth ${this.props.user.token}`
          }
        }
      )
      this.setState({
        followedStreams: theStreams.data.streams
      })
      await this.props.fetchInitialChannels(this.props.user.twitchId)
      await this.props.fetchChannelsStatus(this.props.userTwitchInfo.channels)
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

  handleShowMore() {
    this.setState({
      showMore: !this.state.showMore
    })
  }

  render() {
    return (
      <div>
        <Navbar pos="navbar-featured" />
        <div className="main-layout-wrapper-featured">
          <div className="sidebar-featured">
            <div>
              {this.props.isLoggedIn ? (
                <div className="login-welcome-title">
                  <h4>
                    Welcome{' '}
                    <span className="username-featured">
                      {this.props.user.name}
                    </span>, click any channel to add to multistream.
                  </h4>
                </div>
              ) : (
                <div className="login-welcome-title">
                  <h3>
                    Welcome visitor, click any channel to add to multistream.
                  </h3>
                </div>
              )}
              <div className="customize-form-buttons-box">
                <Button onClick={this.resetSelected} size="small">
                  Clear
                </Button>
                <Button
                  color="purple"
                  onClick={this.routeChange}
                  disabled={this.state.selected.length === 0}
                  size="medium"
                >
                  Watch Streams
                </Button>
              </div>
              <Divider hidden />
              <Button
                inverted
                onClick={this.goToRandomMultistream}
                size="small"
              >
                Go to random multistream
              </Button>
              <Divider hidden />
            </div>
            {/* <a
            className="featured-sidebar-link"
            onClick={this.goToRandomMultistream}
          >
            Go to random Multistream
          </a> */}
            <CustomizeModal />
            <h4>Channels you follow: </h4>
            <Divider hidden />
            {this.props.isLoggedIn && (
              <div className="followed-channels-wrapper">
                <Divider />
                <div>
                  <Grid>
                    {this.state.followedStreams.length > 0 ? (
                      this.state.followedStreams.map((stream, idx) => (
                        <div className="followed-single-channel-wrapper">
                          <div
                            // className="followed-channels-icons"
                            key={stream.channel._id}
                            className={
                              this.state.selected.includes(stream.channel.name)
                                ? 'selected'
                                : 'unselected'
                            }
                            onClick={() =>
                              this.handleClick(stream.channel.name)
                            }
                          >
                            <Image size="mini" src={stream.channel.logo} />

                            <span className="followed-channels-icon-channelName">
                              {stream.channel.name}
                            </span>
                            {/* <span className="followed-channels-followers">
                            {convertFollowers(stream.channel.followers)}
                            followers
                          </span> */}
                            <div className="channel-online">
                              <span>Live</span>
                            </div>
                            {/* {this.props.userTwitchInfo.isOnline[idx] ? (
                            <div className="channel-online">
                              <span>Live</span>
                            </div>
                          ) : (
                            <div className="channel-offline">
                              <span>Offline</span>
                            </div>
                          )} */}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>
                        <Image src="/image/loading.gif" />
                      </div>
                    )}
                    {this.state.showMore ? (
                      this.props.userTwitchInfo.channels
                        .filter(
                          (ch, idx) =>
                            this.props.userTwitchInfo.isOnline[idx] === false
                        )
                        .map(ch => (
                          <div className="followed-single-channel-wrapper">
                            <div
                              // className="followed-channels-icons"
                              key={ch._data.channel._id}
                              className={
                                this.state.selected.includes(
                                  ch._data.channel.name
                                )
                                  ? 'selected'
                                  : 'unselected'
                              }
                              onClick={() =>
                                this.handleClick(ch._data.channel.name)
                              }
                            >
                              <Image size="mini" src={ch._data.channel.logo} />

                              <span className="followed-channels-icon-channelName">
                                {ch._data.channel.name}
                              </span>
                              <div className="channel-offline">
                                <span>Offline</span>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div> </div>
                    )}
                  </Grid>
                </div>
                <Divider hidden />
              </div>
            )}
            <div className="show-button">
              {this.state.showMore ? (
                <a onClick={() => this.handleShowMore()}>
                  <span className="show-less">show less</span>
                </a>
              ) : (
                <a onClick={() => this.handleShowMore()}>
                  <span className="show-more">show more </span>
                </a>
              )}
            </div>

            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
          </div>
          <div className="main-inner-featured">
            <Divider regular />

            <span className="featured-channels-header">
              <h4>Featured Channels</h4>
            </span>
            <Divider regular />
            <Grid>
              {this.state.testArray.map(element => {
                return (
                  <div className="featured-streams-icons">
                    <span className="featured-streams-icon-channelName">
                      {element.stream.channel.name}
                    </span>
                    <Image
                      src={element.stream.preview.medium}
                      className={
                        this.state.selected.includes(
                          element.stream.channel.name
                        )
                          ? 'selected'
                          : 'unselected'
                      }
                      onClick={() =>
                        this.handleClick(element.stream.channel.name)
                      }
                    />
                    <div className="fetaured-stream-description-box">
                      <span className="featured-channels-followers">
                        {convertFollowers(element.stream.channel.followers)}{' '}
                        followers
                      </span>

                      <span className="featured-channels-watching">
                        {convertFollowers(element.stream.viewers)} viewers
                      </span>
                      <span className="featured-channels-game">
                        Game: {element.stream.game}
                      </span>
                      <span className="featured-streams-icons-tooltiptext">
                        {processStreamDescription(element.text)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </Grid>
            <Divider hidden />
            <Divider />
            <span className="browse-by-game-header">
              <h4>Browse channels by game </h4>
            </span>
            <Divider hidden />
            <div className="browse-by-game-selection">
              <Select
                placeholder="Browse by Game"
                onChange={this.getChannelsForThisGame}
                options={this.state.topGames.map(game => ({
                  key: game.id,
                  text: game.name,
                  value: game.name
                }))}
              />
            </div>
            <Divider />
            <Grid>
              {!(this.state.displayChannelsFromTopGames.length === 0) ? (
                this.state.displayChannelsFromTopGames.map(gameChannel => {
                  return (
                    <div className="streams-by-game">
                      <span className="streams-by-game-icon-channelName">
                        {gameChannel.channel.name}
                      </span>
                      <Image
                        src={gameChannel.preview.medium}
                        className={
                          this.state.selected.includes(gameChannel.channel.name)
                            ? 'selected'
                            : 'unselected'
                        }
                        onClick={() =>
                          this.handleClick(gameChannel.channel.name)
                        }
                      />
                      <div className="by-game-stream-description-box">
                        <span className="by-game-channels-followers">
                          {convertFollowers(gameChannel.channel.followers)}{' '}
                          followers
                        </span>
                        <span className="by-game-channels-watching">
                          {convertFollowers(gameChannel.viewers)} viewers
                        </span>
                        <span className="by-game-channels-game">
                          Game: {gameChannel.game}
                        </span>
                        {/* <span className="by-game-streams-icons-tooltiptext">
                    {processStreamDescription(element.text)}
                  </span> */}
                      </div>
                    </div>
                  )
                })
              ) : (
                <p />
              )}
            </Grid>
          </div>
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
