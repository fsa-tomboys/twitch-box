import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const NavbarComponent = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      <div>
        {isLoggedIn ? (
          <div className="nav-link-container">
            {/* The navbar will show these links after you log in */}
            <div className="nav-function-items">
              <Link to="/featured">Featured Streams</Link>
              <Link to="/customize">Customize Streams</Link>
              <Link to="/list">View Created Streams</Link>
            </div>
            <span className="top-header">
              <h1>TWITCH BOX</h1>
            </span>
            <div className="nav-login-items">
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          </div>
        ) : (
          <div className="nav-link-container">
            {/* The navbar will show these links before you log in */}
            <div className="nav-function-items">
              <Link to="/featured">Featured Streams</Link>
              <Link to="/customize">Customize Streams</Link>
            </div>
            <span className="top-header">
              <h1>TWITCH BOX</h1>
            </span>
            <div className="nav-login-items">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NavbarComponent)

/**
 * PROP TYPES
 */
NavbarComponent.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
