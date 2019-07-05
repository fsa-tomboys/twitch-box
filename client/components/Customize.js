import React from 'react'
import history from '../history'
import {Button, Form, Checkbox} from 'semantic-ui-react'

export class Customize extends React.Component {
  constructor(props) {
    super(props)
    this.initState = {
      name1: '',
      name2: '',
      name3: '',
      name4: ''
    }
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
    let arr = []
    for (let key in this.state) {
      if (this.state[key]) {
        arr.push(this.state[key])
      }
    }
    console.log('arr: ', arr)
    console.log('history: ', history)
    history.push({
      pathname: '/home?list=' + arr.join('-'),
      state: {testArray: arr}
    })
    // arr is an array of strings to be passed to other component
  }

  render() {
    return (
      <div>
        <div>
          <Form className="customize-form-box" onSubmit={this.handleSubmit}>
            <div className="customize-form-inputs-box">
              <div className="customize-form-input">
                <Form.Field>
                  <input
                    onChange={this.handleChange}
                    name="name1"
                    value={this.state.name1}
                    placeholder="First Channel"
                  />
                </Form.Field>
              </div>
              <div className="customize-form-input">
                {this.state.name1 && (
                  <Form.Field>
                    <input
                      onChange={this.handleChange}
                      name="name2"
                      value={this.state.name2}
                      placeholder="Second Channel"
                    />
                  </Form.Field>
                )}
              </div>
              <div className="customize-form-input">
                {this.state.name2 && (
                  <Form.Field>
                    <input
                      onChange={this.handleChange}
                      name="name3"
                      value={this.state.name3}
                      placeholder="Third Channel"
                    />
                  </Form.Field>
                )}
              </div>
              <div className="customize-form-input">
                {this.state.name3 && (
                  <Form.Field>
                    <input
                      onChange={this.handleChange}
                      name="name4"
                      value={this.state.name4}
                      placeholder="Forth Channel"
                    />
                  </Form.Field>
                )}
              </div>
            </div>
            <div className="customize-form-buttons-box">
              <div className="customize-form-button">
                <Button type="button" onClick={evt => this.handleClear()}>
                  Clear
                </Button>
              </div>
              <div className="customize-form-button">
                <Button type="submit" onClick={this.handleSubmit}>
                  Watch Streams
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}
