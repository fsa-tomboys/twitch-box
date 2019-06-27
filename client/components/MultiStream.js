import React, {Component} from 'react'
import SingleStreamComponent from './SingleStreamComponent'
import {Chat} from './chat'
import {Button, Header, Input, Modal, Label} from 'semantic-ui-react'
import MultistreamSidebar from './MultistreamSidebar'

export class MultiStream extends Component {
  constructor() {
    super()
    this.state = {
      testArray: ['orb', 'maxgrosshandler']
    }
    this.remove = this.remove.bind(this)
  }
  remove(element) {
    let arr = this.state.testArray

    var index = arr.indexOf(element)
    if (index !== -1) arr.splice(index, 1)
    this.setState({
      testArray: arr
    })
  }
  componentDidMount() {
    this.setState({
      testArray: this.props.location.state.testArray
    })
  }
  render() {
    return (
      <div>
        <div className="main-layout-container">
          {this.state.testArray[0] !== 'orb' && (
            <MultistreamSidebar
              testArray={this.state.testArray}
              remove={this.remove}
            />
          )}

          <div className="all-streams-container">
            {this.props.location.state.testArray.map(element => (
              <SingleStreamComponent name={element} />
            ))}
            <Chat testArray={this.props.location.state.testArray} />
          </div>
        </div>
      </div>
    )
  }
}
