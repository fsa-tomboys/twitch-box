import React, {Component} from 'react'
import {Icon} from 'semantic-ui-react'

class SingleStreamComponent extends Component {
  render() {
    let width
    let height
    // if 4 -> 1 on top and 3 on the bottom
    //  1 full width and height and 3 1/3 of width and specific height

    // if 3 -> 1 on top and 2 on the bottom
    //  1 full width and height and 3 1/2 of width and specific height
    //
    // if 2 -> 1 on top and 1 on the bottom
    //  Both full widt hand 1/2 heigth and specific width

    //  if 1 -> full screen

    let streamNumber = this.props.streamNum
    let totalStreams = this.props.totalNumber
    switch (totalStreams) {
      case 1:
        width = window.innerWidth - 550
        height = window.innerHeight
        break
      case 2:
        width = window.innerWidth - 550
        height = (window.innerHeight - 200) / 2
        break
      case 3:
        if (streamNumber === 0) {
          width = window.innerWidth - 550
          height = (window.innerHeight - 200) / 2
        } else {
          width = (window.innerWidth - 550) / 2
          height = window.innerHeight / 2
        }
        break
      case 4:
        width = (window.innerWidth - 550) / 2
        height = window.innerHeight / 2
        break
      default:
        console.log('nothing')
        break
    }

    return (
      <div className="single-stream-outer">
        <div className="single-stream-overlay-menu">
          <div className="single-stream-overlay-icon-box">
            <a className="single-stream-link" href="#">
              <Icon name="user outline" size="large" />{' '}
            </a>
            <a className="single-stream-link" href="#">
              <Icon name="sound" size="large" />
            </a>
            <a className="single-stream-link" href="#">
              <Icon name="chat" size="large" />
            </a>
            <a className="single-stream-link" href="#">
              <Icon name="refresh" size="large" />
            </a>
            <a className="single-stream-link" href="#">
              <Icon name="window close" size="large" />
            </a>
          </div>
        </div>

        <iframe
          src={`https://player.twitch.tv/?allowfullscreen&channel=${
            this.props.name
          }`}
          // width="640"
          // height="390"
          width={width}
          height={height}
          frameBorder="0"
          scrolling="no"
          allow="autoplay; fullscreen"
          allowFullScreen=""
        />
      </div>
    )
  }
}

export default SingleStreamComponent
