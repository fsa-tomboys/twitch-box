/* eslint-disable react/jsx-key */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Navbar from './navbar'
import {Grid, Image, Button, Divider, Select} from 'semantic-ui-react'
import axios from 'axios'
import {
  fetchTwitchUser,
  fetchUserChannels,
  fetchChannelsStreamsStatus
} from '../store/usertwitchinfo'
import {createMultistream, fetchMultistreams} from '../store/multistreams'
import {fetchClips} from '../store/clip'
import {fetchRefreshTokens} from '../store/user'
import {createUserMultistreamAssociation} from '../store/users'
import CustomizeModal from './modals/customizeModal'

//This component serves as the home page where users can create a multistream in a variety of ways
function randomNumberGenerator(maxNum) {
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

class TFT extends Component {
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

  resetSelected() {
    this.setState({
      selected: []
    })
  }
  async componentDidMount() {
    let featuredChannels = await axios.get(
      'https://api.twitch.tv/helix/streams?game_id=513143',
      {
        headers: {'Client-ID': 'wpp8xoz167jt0vnmlmko398h4g8ydh'}
      }
    )
    axios.get('api/users/tft')
    console.log(featuredChannels.data.data)
    this.setState({
      testArray: featuredChannels.data.data
    })
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
          <div className="main-inner-featured">
            <Divider regular />

            <span className="featured-channels-header">
              <h1>TFT</h1>
            </span>
            <Divider regular />
            <Grid>
              {this.state.testArray.map(element => {
                return (
                  <div className="featured-streams-icons">
                    <span className="featured-streams-icon-channelName">
                      {element.user_name}
                    </span>

                    <div className="fetaured-stream-description-box">
                      <span className="featured-channels-game">
                        Game: Teamfight Tactics
                      </span>
                    </div>
                  </div>
                )
              })}
            </Grid>
            <Divider hidden />
            <Divider />

            <Divider hidden />
            <Divider />
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
    fetchChannelsStatus: channels =>
      dispatch(fetchChannelsStreamsStatus(channels)),
    fetchRT: () => dispatch(fetchRefreshTokens())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TFT)
