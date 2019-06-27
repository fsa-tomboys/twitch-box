import React, {Component} from 'react'
import SingleStreamComponent from './SingleStreamComponent'
import {Chat} from './chat'
import {Button, Modal} from 'semantic-ui-react'
import MultistreamSidebar from './MultistreamSidebar'

export class MultiStream extends Component {
  constructor() {
    super()
    this.state = {
      testArray: [],
      index: 0
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.remove = this.remove.bind(this)
    this.addStream = this.addStream.bind(this)
  }
  remove(element) {
    let arr = this.state.testArray

    var index = arr.indexOf(element)
    if (index !== -1) arr.splice(index, 1)
    this.setState({
      testArray: arr
    })
  }
  addStream(event) {
    let arr = this.state.testArray
    let newArr = arr.concat(event.target.newStream.value)
    this.setState({
      testArray: newArr
    })
  }
  componentDidMount() {
    this.setState({
      testArray: this.props.location.state.testArray
    })
  }

  handleSelect(evt) {
    let index = this.state.testArray.indexOf(evt.target.textContent)
    this.setState({index})
  }
  render() {
    return (
      <div>
        <div className="main-layout-container">
          {this.state.testArray.length > 0 && (
            <MultistreamSidebar
              testArray={this.state.testArray}
              remove={this.remove}
              addStream={this.addStream}
            />
          )}

          <div className="all-streams-container">
            {this.state.testArray.map((element, index) => (
              <SingleStreamComponent
                name={element}
                streamNum={index}
                totalNumber={this.state.testArray.length}
                classIndex={index}
              />
            ))}
            {this.state.testArray.length > 0 && (
              <Chat
                index={this.state.index}
                array={this.state.testArray}
                handleSelect={this.handleSelect}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}
