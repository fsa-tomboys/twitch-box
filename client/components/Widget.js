import React, {Component} from 'react'
import {Icon} from 'semantic-ui-react'
import socket from '../socket'
import queryString from 'query-string'

// var SSCD = require('sscd').sscd
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
    // var world = new SSCD.World()
    let uniqueCanvas = this.state.name + '-canvas'

    return (
      <div className="single-stream-outer">
        <canvas id={uniqueCanvas} width="800" height="800" />

        <div />
      </div>
    )
  }
}

export default Widget
