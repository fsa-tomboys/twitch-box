import React, {Component} from 'react'
import {Icon} from 'semantic-ui-react'
import socket from '../socket'
import queryString from 'query-string'

export class Widget extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
  }
  componentDidMount() {
    let queryStuff = queryString.parse(this.props.location.search)
    console.log('here is a thing: ', queryStuff)
    this.setState({name: queryStuff.name})
  }

  render() {
    console.log('i am the props, ', this.props)
    let uniqueCanvas = this.state.name + '-canvas'
    console.log('name is here: ', uniqueCanvas)
    return (
      <div className="single-stream-outer">
        <div className="single-stream-overlay-menu" />
        <canvas id={uniqueCanvas} width="200" height="100" />
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
