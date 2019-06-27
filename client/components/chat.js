import React from 'react'
import {Button, Form, Checkbox} from 'semantic-ui-react'

export class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.initState = {}
    this.state = this.initState
    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClear() {
    this.setState(this.initState)
  }

  handleChange(evt) {
    // console.log('evt.target.name: ', evt.target.name)
    // console.log('evt.target.value: ', evt.target.value)
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
  }

  render() {
    return (
      <div>
        <iframe
          frameBorder="<frameborder width>"
          scrolling="<scrolling>"
          id="<channel>"
          src="<src url>"
          height="<height>"
          width="<width>"
        />
      </div>
    )
  }
}
