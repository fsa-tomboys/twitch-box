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

const Navbar = ({handleClick, isLoggedIn, pos}) => (
  <div className={pos}>
    <Menu size="small" inverted>
      <span className="navbar-home-icon">
        <a href="/featured">
          {' '}
          <Icon color="grey" name="home" size="huge" />
        </a>
      </span>
      <Menu.Item>
        <AboutModal />
      </Menu.Item>
      <span className="top-header">
        <h1>twitch box</h1>
      </span>
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
        <Menu.Item as={Link} to="/login" position="right">
          Login
        </Menu.Item>
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
