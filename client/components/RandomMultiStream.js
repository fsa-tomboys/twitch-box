import React, {Component} from 'react'

//Same as the Multistream component, just takes in a random amount of streams
class RandomMultistream extends Component {
  render() {
    let width = this.props.height
    let height = this.props.width

    return (
      <div className="random-single-stream-inner">
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

export default RandomMultistream
