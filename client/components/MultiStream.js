import React, {Component} from 'react'
import SingleStreamComponent from './SingleStreamComponent'
import {Chat} from './chat'
import {Button, Modal} from 'semantic-ui-react'
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
        <Modal trigger={<Button>Edit</Button>}>
          <Modal.Header>Edit Streams</Modal.Header>

          <Modal.Description className="customize-form-box">
            {this.state.testArray.map(element => (
              <div>
                <Button
                  animated
                  disabled={this.state.testArray.length === 1}
                  onClick={() => this.remove(element)}
                >
                  <Button.Content visible>{element}</Button.Content>
                  <Button.Content hidden>Remove</Button.Content>
                </Button>
              </div>
            ))}
          </Modal.Description>
        </Modal>
        <div className="main-layout-container">
          <MultistreamSidebar />
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
