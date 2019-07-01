import React, {Component} from 'react'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import {Grid, Image, Card, Button} from 'semantic-ui-react'
import TwitchClient from 'twitch'
import {connect} from 'react-redux'
import axios from 'axios'
import {fetchTwitchUser, fetchUserChannels} from '../store/usertwitchinfo'

class Featured extends Component {
  constructor(props) {
    super(props)
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
      pathname: '/home?list=' + this.state.selected.join(','),
      state: {testArray: this.state.selected}
    })
  }
  resetState() {
    this.setState({
      selected: []
    })
  }
  async componentDidMount() {
    let snake = await axios.get(
      'https://api.twitch.tv/kraken/streams/featured?limit=10',
      {
        headers: {'Client-ID': 'wpp8xoz167jt0vnmlmko398h4g8ydh'}
      }
    )
    this.setState({
      featuredVids: snake.data.featured
    })

    let id = this.props.user.twitchId
    // console.log('this.props.user: ', this.props.user)
    // let id = '444085153'
    // let theUser = await axios.get(`/api/usertwitchinfo/${id}`)
    // console.log('theUser: ', theUser)
    // let channels = await axios.get(`/api/usertwitchinfo/channels/${id}`)
    // console.log('channels: ' ,channels)
    await this.props.fetchInitialTwitchUser(id)
    await this.props.fetchInitialChannels(id)
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
  }

  render() {
    console.log('this.props.userTwitchInfo: ', this.props.userTwitchInfo)

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
