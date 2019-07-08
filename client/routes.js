import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  MultiStream,
  Featured,
  Customize,
  Chat,
  List,
  Widget,
  ViewClipsComponent
} from './components'

import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        {/* <Route path="/singlestream" component={SingleStreamComponent} /> */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={MultiStream} />
        <Route path="/home:list" component={MultiStream} />
        <Route path="/clips:list" component={ViewClipsComponent} />
        <Route path="/customize" component={Customize} />
        <Route path="/featured" component={Featured} />
        <Route path="/chat" component={Chat} />
        {this.props.location.search.includes('name') && (
          <Route path="/widget" component={Widget} />
        )}
        <Route path="/" component={Featured} />
        {/* <Route path="/list" component={List} /> */}

        {/* Displays our Login component as a fallback */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
