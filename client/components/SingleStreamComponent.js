import React, {Component} from 'react'
import {Icon} from 'semantic-ui-react'

class SingleStreamComponent extends Component {
  constructor() {
    super()
    this.state = {
      width: window.innerWidth - 200,
      height: window.innerHeight - 200
    }
  }

  // if (this.props.classIndex === 0) {
  //   addClassName = 'main'
  //   this.setState({width: window.innerWidth - 200})
  //   this.setState({height: window.innerHeight - 200})
  // } else {
  //   this.setState({width: 300})
  //   this.setState({height: 200})
  // }

  render() {
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
          width={this.state.width}
          height={this.state.height}
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
