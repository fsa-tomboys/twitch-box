import React, {Component} from 'react'
import queryString from 'query-string'

export class Widget extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
  }
  componentDidMount() {
    //This component did mount method parses out the query string and assigns the name on state to the parsed named from the query string
    let queryStuff = queryString.parse(this.props.location.search)

    this.setState({name: queryStuff.name})
  }

  render() {
    // This component has had the socket passed down to it, so whenever a reaction event is fired, it triggers the canvas.
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
