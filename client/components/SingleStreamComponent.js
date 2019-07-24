import React, {Component} from 'react'
import {Icon} from 'semantic-ui-react'
import socket from '../socket'
class SingleStreamComponent extends Component {
  //This component displays a single stream
  render() {
    let width
    let height
    let streamNumber = this.props.streamNum
    let totalStreams = this.props.totalNumber
    let handleChatClick = this.props.handleChatClick
    // This switch statement helps resize the streams as needed to make a consistent user experience
    switch (totalStreams) {
      case 1:
        width = window.innerWidth - 473
        height = window.innerHeight - 140

        break
      case 2:
        width = window.innerWidth - 473
        height = window.innerHeight / 2 - 100
        break
      case 3:
        if (streamNumber === 0) {
          width = window.innerWidth - 473
          height = window.innerHeight / 2 - 100
        } else {
          width = (window.innerWidth - 478) / 2
          height = window.innerHeight / 2 - 100
        }
        break
      case 4:
        width = (window.innerWidth - 490) / 2
        height = window.innerHeight / 2 - 100
        break
      case 5:
        width = (window.innerWidth - 520) / 2
        height = window.innerHeight / 3 - 100
      case 6:
        width = (window.innerWidth - 520) / 2
        height = window.innerHeight / 3 - 100
      default:
        console.log('There must be an error.')
        break
    }
    //This variable is needed to connect the Single Stream Componennt with the Widget
    const uniqueCanvas = this.props.name + '-canvas'
    return (
      <div className="single-stream-outer">
        <div className="single-stream-overlay-menu">
          <div className="single-stream-overlay-icon-box">
            <a className="single-stream-link" href="#">
              <Icon
                name="user outline"
                onClick={() => {
                  window.open(`https://twitch.tv/${this.props.name}`)
                }}
              />{' '}
            </a>
            <a
              className="single-stream-link"
              href="#"
              onClick={() => handleChatClick(this.props.name)}
            >
              <Icon name="chat" />
            </a>
            <a
              className="single-stream-link"
              href="#"
              onClick={() => socket.emit('newThumb', uniqueCanvas)}
            >
              <Icon name="thumbs up outline" />
            </a>
            <a
              className="single-stream-link"
              href="#"
              onClick={() => socket.emit('newHeart', uniqueCanvas)}
            >
              <Icon name="heart" />
            </a>
            <a
              className="single-stream-link"
              href="#"
              onClick={() => socket.emit('newSmile', uniqueCanvas)}
            >
              <Icon name="smile outline" />
            </a>

            <a className="single-stream-link" href="#">
              <Icon
                name="window close"
                onClick={() => this.props.remove(this.props.name)}
                disabled={totalStreams < 2}
              />
            </a>
          </div>
        </div>

        <div />
        <iframe
          src={`https://player.twitch.tv/?allowfullscreen&channel=${
            this.props.name
          }`}
          width={width}
          height={height}
          frameBorder="0"
          scrolling="no"
          allow="autoplay; fullscreen"
          allowFullScreen=""
          className=""
        />
      </div>
    )
  }
}

export default SingleStreamComponent
