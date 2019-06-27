import React, {Component} from 'react'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import {Grid} from 'semantic-ui-react'
import equal from 'fast-deep-equal'
import SingleStreamComponent from './SingleStreamComponent'

export class Test extends Component {
  constructor() {
    super()
    this.state = {
      width: window.innerHeight,
      height: window.innerHeight,
      testArray: ['orb', 'maxgrosshandler']
    }
    this.updateDimensions = this.updateDimensions.bind(this)
  }

  updateDimensions() {
    console.log(this.state)
    this.setState({width: window.innerWidth, height: window.innerHeight})
    console.log(this.state)
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', () => {
      this.updateDimensions()
      // console.log(this.state.width)
      // console.log(this.state.height)
    })
  }

  // componentWillMount() {
  //   this.updateDimensions();
  //   console.log(this.state.width)
  //   console.log(this.state.height)
  // }

  //   componentWillUnmount() {
  //     window.removeEventListener("resize",  this.updateDimensions())

  //     // console.log(this.state)
  // }

  render() {
    // console.log('RENDER:', typeof this.state.width)
    // let newWidth = String(this.state.width)
    // let newHeight = String(this.state.height)
    return (
      <div className="main-layout-container">
        {this.state.testArray.map(element => (
          <SingleStreamComponent name={element} />
        ))}
      </div>
    )
  }
}

export default Test
