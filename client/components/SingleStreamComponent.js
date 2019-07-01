import React, {Component} from 'react'
import {Icon} from 'semantic-ui-react'

class SingleStreamComponent extends Component {
  render() {
    let width
    let height
    let streamNumber = this.props.streamNum
    let totalStreams = this.props.totalNumber
    if (streamNumber === 0) {
      let element = document.getElementsByClassName('single-stream-outer')

      console.log('Element', element.className)
    }
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
        width = (window.innerWidth - 478) / 2
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
              <Icon name="arrow alternate circle up outline" size="large" />{' '}
            </a>
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
