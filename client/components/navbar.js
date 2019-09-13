import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Dropdown, Icon, Button} from 'semantic-ui-react'
import ProfileModal from './modals/profileModal'
import MultistreamModal from './modals/multistreamModal'
import MyClipsModal from './modals/myClipsModal'
import AboutModal from './modals/aboutModal'
// This is our navbar component. It has an icon that takes a user back to the home/Featured page, and a dropdown for their profile if they are logged in
const Navbar = ({handleClick, isLoggedIn, pos}) => (
  <div className={pos}>
    <Menu size="small" inverted>
      <span className="navbar-home-icon">
        <a href="/featured">
          {' '}
          <Icon color="grey" name="home" size="huge" />
        </a>
      </span>
      <span className="navbar-element">
        <Menu.Item>
          <AboutModal />
        </Menu.Item>
      </span>
      <Menu.Item as={Link} to="/tft" position="right">
        TFT Hub (Beta)
      </Menu.Item>

      <span className="top-header">
        <h1>twitch box</h1>
      </span>
      {/* This only displays if the user is logged in */}
      {isLoggedIn ? (
        <div className="my-profile-dropdown-navbar">
          <Dropdown
            className="my-profile-dropdown-self"
            item
            text="View My Info"
          >
            <Dropdown.Menu>
              <Dropdown.Item>
                <span className="profile-dropdown">
                  <ProfileModal />
                </span>
              </Dropdown.Item>
              <Dropdown.Item as={Button}>
                <MultistreamModal />
              </Dropdown.Item>
              <Dropdown.Item>
                <MyClipsModal />
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="#" onClick={handleClick}>
                <span className="logout-dropdown">Logout</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ) : (
        <div />
      )}
      {!isLoggedIn && pos !== 'navbar-login' ? (
        <Menu.Item as={Link} to="/login" position="right">
          Login
        </Menu.Item>
      ) : (
        <div />
      )}
    </Menu>
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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
