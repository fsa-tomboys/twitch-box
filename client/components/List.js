import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios'

export class List extends Component {
  constructor() {
    super()
    this.state = {
      streams: []
    }
  }
  async componentDidMount() {
    let fetchedStreams = await axios.get('/api/streams')
    this.setState({
      streams: fetchedStreams.data
    })
  }
  render() {
    return this.state.streams[0] ? (
      <div>
        {this.state.streams.map(stream => (
          <div key={stream.id}>{stream.link}</div>
        ))}
      </div>
    ) : (
      <div>Error Loading</div>
    )
  }
}

export default List
