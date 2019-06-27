import React from 'react'
// import Navbar from './navbar'
// import {createProduct, fetchProducts} from '../../store/products'
// import {connect} from 'react-redux'
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
    console.log('name1: ', this.state.name1)
    console.log('name2: ', this.state.name2)
    console.log('name3: ', this.state.name3)
    console.log('name4: ', this.state.name4)
    return (
      <div>
        <div>
          <Form className="customize-form-box">
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
                <Button type="submit" onClick={evt => this.handleSubmit()}>
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
