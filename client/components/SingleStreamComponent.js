import React, {Component} from 'react'
import Link from 'react-router-dom'
import {Icon} from 'semantic-ui-react'

class SingleStreamComponent extends Component {
  render() {
    let width
    let height
    let streamNumber = this.props.streamNum
    let totalStreams = this.props.totalNumber
    switch (totalStreams) {
      case 1:
        width = window.innerWidth - 480
        height = window.innerHeight - 140
        break
      case 2:
        width = window.innerWidth - 480
        height = window.innerHeight / 2 - 100
        break
      case 3:
        if (streamNumber === 0) {
          width = window.innerWidth - 446
          height = window.innerHeight / 2 - 100
        } else {
          width = (window.innerWidth - 452) / 2
          height = window.innerHeight / 2 - 100
        }
        break
      case 4:
        width = (window.innerWidth - 540) / 2
        height = window.innerHeight / 2 - 100
        break
      default:
        console.log('There must be an error.')
        break
    }

    return (
      <div className="single-stream-outer">
        <div className="single-stream-overlay-menu">
          <div className="single-stream-overlay-icon-box">
            <a className="single-stream-link" href="#">
              <Icon
                name="user outline"
                size="large"
                onClick={() => {
                  window.open(`https://twitch.tv/${this.props.name}`)
                }}
              />{' '}
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
