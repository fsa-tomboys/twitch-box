import React, {Component} from 'react'
import SingleStreamComponent from './SingleStreamComponent'
import {Chat} from './chat'
import MultistreamSidebar from './MultistreamSidebar'

export class MultiStream extends Component {
  constructor() {
    super()
    this.state = {
      testArray: ['orb', 'maxgrosshandler']
    }
  }
  render() {
    return (
      <div className="main-layout-container">
        <MultistreamSidebar />
        <div className="all-streams-container">
          {this.props.location.state.testArray.map(element => (
            <SingleStreamComponent name={element} />
          ))}
          <Chat testArray={this.props.location.state.testArray} />
        </div>
      </div>
    )
  }
}
