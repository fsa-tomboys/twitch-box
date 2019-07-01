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
    // if (Object.keys(this.props.user).length !== 0) {
    //   this.test(this.props.user.name)
    // }
    // id: 3, email: null, name: "taowang6000", googleId: null, twitchId: "444085153"
    // profile from oauth:
    //Profile:  {
    //   provider: 'twitch',
    //   id: '444085153',
    //   username: 'taowang6000',
    //   displayName: 'taowang6000',
    //   email: 'tao.wang6000@gmail.com',
    //   _raw: '{"display_name":"taowang6000","_id":"444085153","name":"taowang6000","type":"user","bio":null,"created_at":"2019-06-25T21:25:15.414034Z","updated_at":"2019-06-25T21:25:15.414034Z","logo":"https://static-cdn.jtvnw.net/user-default-pictures/27103734-3cda-44d6-a384-f2ab71e4bb85-profile_image-300x300.jpg","email":"tao.wang6000@gmail.com","email_verified":true,"partnered":false,"twitter_connected":false,"notifications":{"push":true,"email":true}}',
    //   _json: {
    //     display_name: 'taowang6000',
    //     _id: '444085153',
    //     name: 'taowang6000',
    //     type: 'user',
    //     bio: null,
    //     created_at: '2019-06-25T21:25:15.414034Z',
    //     updated_at: '2019-06-25T21:25:15.414034Z',
    //     logo: 'https://static-cdn.jtvnw.net/user-default-pictures/27103734-3cda-44d6-a384-f2ab71e4bb85-profile_image-300x300.jpg',
    //     email: 'tao.wang6000@gmail.com',
    //     email_verified: true,
    //     partnered: false,
    //     twitter_connected: false,
    //     notifications: { push: true, email: true }
    //   }
    // }

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
