import React from 'react'
import {Select, Search, Button, Form, Checkbox} from 'semantic-ui-react'

export class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.testArray = this.props.testArray
    // this.testArray = ['orb', 'maxgrosshandler']
    this.initState =
      this.testArray.length === 0 ? {name: ''} : {name: this.testArray[0]}
    this.state = this.initState
    this.options = this.testArray.map(name => ({
      key: name,
      text: name,
      value: name
    }))
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(evt) {
    this.setState({name: evt.target.textContent})
  }

  render() {
    return (
      <div>
        <div>
          <iframe
            frameBorder="0"
            scrolling="no"
            id="chat_embed"
            src={`https://www.twitch.tv/embed/${this.state.name}/chat`}
            height="500"
            width="350"
          />
        </div>
        <Select
          placeholder="Select the Channel for Chat"
          options={this.options}
          onChange={evt => this.handleSelect(evt)}
        />
      </div>
    )
  }
}
