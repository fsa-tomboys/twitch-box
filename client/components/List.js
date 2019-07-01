import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {Button, Card, Image} from 'semantic-ui-react'
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
          <div key={stream.id}>
            <Card>
              <Card.Content>
                <Card.Header>Multistream {' ' + stream.id}</Card.Header>
                <Card.Description>
                  <Link to={stream.link}>
                    {' ' +
                      stream.link
                        .split('=')[1]
                        .split('-')
                        .join(', ')}
                  </Link>
                </Card.Description>
              </Card.Content>
            </Card>
          </div>
        ))}
      </div>
    ) : (
      <div>No streams found</div>
    )
  }
}

export default List
