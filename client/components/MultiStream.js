import React, {Component} from 'react'
import SingleStreamComponent from './SingleStreamComponent'
import {Chat} from './chat'
import MultistreamSidebar from './MultistreamSidebar'
import queryString from 'query-string'
import {Grid, Image, Button, Divider, Select} from 'semantic-ui-react'
import axios from 'axios'
import TimeMe from 'timeme.js'
import Navbar from './navbar'
export class MultiStream extends Component {
  constructor() {
    super()
    this.state = {
      testArray: [],
      index: 0,
      channelIds: []
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.remove = this.remove.bind(this)
    this.addStream = this.addStream.bind(this)
    this.handleChatClick = this.handleChatClick.bind(this)
    this.getChannelId = this.getChannelId.bind(this)
    this.getTime = this.getTime.bind(this)
  }
  remove(element) {
    let arr = this.state.testArray

    var index = arr.indexOf(element)
    if (index !== -1) arr.splice(index, 1)
    this.setState({
      testArray: arr
    })
    this.props.history.push({
      pathname: '/home?list=' + this.state.testArray.join('-')
    })
  }
  addStream(event) {
    let arr = this.state.testArray
    let newArr = arr.concat(event.target.newStream.value)

    this.setState({
      testArray: newArr
    })
    this.props.history.push({
      pathname: '/home?list=' + newArr.join('-')
    })
  }
  toggleChat() {}

  async getChannelId(channelsArray) {
    let allChannelIdArray = []
    // console.log(channelsArray)
    for (let i = 0; i < channelsArray.length; i++) {
      let currentChannelIds = await axios.get(
        `https://api.twitch.tv/helix/users?login=${channelsArray[i]}`,
        {
          headers: {'Client-ID': 'wpp8xoz167jt0vnmlmko398h4g8ydh'}
        }
      )
      allChannelIdArray.push(currentChannelIds.data.data[0].id)
    }
    this.setState({
      channelIds: allChannelIdArray
    })
  }
  componentDidMount() {
    let queryStuff = queryString.parse(this.props.match.params.list)
    if (queryStuff.list === undefined) {
      queryStuff = queryString.parse(this.props.location.search)
    }
    let arrFromProps = queryStuff.list.split('-')

    this.setState({
      testArray: arrFromProps || this.props.location.state.testArray
    })
    TimeMe.initialize({
      currentPageName: 'my-home-page', // current page
      idleTimeoutInSeconds: 30 // seconds
    })
    TimeMe.callWhenUserLeaves(function() {
      console.log('The user is not currently viewing the page!')
    })
  }

  handleSelect(evt) {
    let index = this.state.testArray.indexOf(evt.target.textContent)
    this.setState({index})
  }

  handleChatClick(name) {
    let index = this.state.testArray.indexOf(name)
    this.setState({index})
  }
  getTime() {
    return TimeMe.getTimeOnCurrentPageInSeconds()
  }

  render() {
    this.getChannelId(this.state.testArray)

    console.log('checking PROPS in multistream :', this.props)
    return (
      <div>
        <Navbar pos="navbar" />
        <div className="main-layout-container">
          {this.state.testArray.length > 0 && (
            <MultistreamSidebar
              testArray={this.state.testArray}
              remove={this.remove}
              addStream={this.addStream}
              channelIds={this.state.channelIds}
              getTime={this.getTime}
            />
          )}
          {/* </div> */}
          <div className="all-streams-container">
            {this.state.testArray.map((element, index) => (
              <SingleStreamComponent
                name={element}
                streamNum={index}
                totalNumber={this.state.testArray.length}
                handleChatClick={this.handleChatClick}
                key={index}
                handleSelect={this.handleSelect}
                remove={this.remove}
              />
            ))}
          </div>
          {this.state.testArray.length > 0 && (
            <Chat
              index={this.state.index}
              array={this.state.testArray}
              handleSelect={this.handleSelect}
              setHeight={window.innerHeight - 140}
            />
          )}
        </div>
      </div>
    )
  }
}
