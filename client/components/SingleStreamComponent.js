import React, {Component} from 'react'

class SingleStreamComponent extends Component {
  render() {
    return (
      <div className="single-stream-outer">
        <div className="single-stream-overlay-menu">
          <span className="single-stream-overlay-links">test</span>
        </div>
        <iframe
          src={`https://player.twitch.tv/?allowfullscreen&channel=${
            this.props.name
          }`}
          width="640"
          height="390"
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
