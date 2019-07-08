import React, {Component} from 'react'
// import {Icon} from 'semantic-ui-react'

class SingleClipComponent extends Component {
  render() {
    let width, height
    let clipNumber = this.props.index
    let totalClips = this.props.totalClips

    switch (totalClips) {
      case 1:
        width = window.innerWidth - 473
        height = window.innerHeight - 140

        break
      case 2:
        width = window.innerWidth - 473
        height = window.innerHeight / 2 - 100
        break
      case 3:
        if (clipNumber === 0) {
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
      default:
        console.log('There must be an error.')
        break
    }

    return (
      <div>
        <iframe
          src={`https://clips.twitch.tv/embed?clip=${this.props.source}`}
          height={height}
          width={width}
          frameBorder="0"
          scrolling="no"
          allowFullScreen="true"
        />
      </div>
    )
  }
}

export default SingleClipComponent
