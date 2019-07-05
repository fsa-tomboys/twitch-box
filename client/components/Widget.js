import React, {Component} from 'react'
import {Icon} from 'semantic-ui-react'
import socket from '../socket'
import queryString from 'query-string'
import * as PIXI from 'pixi.js'

export class Widget extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
  }
  componentDidMount() {
    let queryStuff = queryString.parse(this.props.location.search)

    this.setState({name: queryStuff.name})
  }

  render() {
    let uniqueCanvas = this.state.name + '-canvas'

    return (
      <div className="single-stream-outer">
        <div className="single-stream-overlay-menu" />
        <canvas id={uniqueCanvas} width="300" height="300" />
        <h3>{this.state.name}</h3>
        <button
          type="button"
          onClick={() => socket.emit('displayCanvas', uniqueCanvas)}
        >
          Yes!
        </button>

        <div />
      </div>
    )
  }
}

export default Widget
