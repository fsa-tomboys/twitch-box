import React, {Component} from 'react'
import SingleClipComponent from './SingleClipComponent'
import Navbar from './navbar'
// import {Chat} from './chat'
// import MultistreamSidebar from './MultistreamSidebar'
import queryString from 'query-string'
import {Grid, Image, Button, Divider, Select} from 'semantic-ui-react'
import axios from 'axios'

export class ViewClipsComponent extends Component {
  constructor() {
    super()
    this.state = {
      clipsArray: []
    }
  }
  componentDidMount() {
    let queryStuff = queryString.parse(this.props.match.params.list)
    if (queryStuff.list === undefined) {
      queryStuff = queryString.parse(this.props.location.search)
    }
    let arrFromProps = queryStuff.list.split('-')

    this.setState({
      clipsArray: arrFromProps || this.props.location.state.clipsArray
    })
  }

  render() {
    let length = this.state.clipsArray.length
    return (
      <div>
        <Navbar className="navbar" />
        <div className="all-clips-container">
          {this.state.clipsArray.map((element, index) => (
            <SingleClipComponent
              source={element}
              clipNumber={index}
              totalClips={length}
              key={index}
            />
          ))}
        </div>
      </div>
    )
  }
}
