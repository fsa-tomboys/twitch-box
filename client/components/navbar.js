import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Dropdown} from 'semantic-ui-react'
import ProfileModal from './modals/profileModal'
import MultistreamModal from './modals/multistreamModal'
import MyClipsModal from './modals/myClipsModal'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navbar">
    {isLoggedIn ? (
      <Menu size="massive" inverted>
        <Menu.Item as={Link} to="/featured">
          Featured Streams
        </Menu.Item>
        <span className="top-header">
          <h1>TWITCH BOX</h1>
        </span>
        <Menu.Menu position="right">
          <Dropdown item text="View My Info">
            <Dropdown.Menu>
              <Dropdown.Item>
                <ProfileModal />
              </Dropdown.Item>
              <Dropdown.Item>
                <MultistreamModal />
              </Dropdown.Item>
              <Dropdown.Item>
                <MyClipsModal />
              </Dropdown.Item>
              {/* <Dropdown.Item>My Clips</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
        <Menu.Item as={Link} to="#" onClick={handleClick}>
          Logout
        </Menu.Item>
      </Menu>
    ) : (
      <Menu size="massive" inverted>
        <Menu.Item as={Link} to="/featured">
          Featured Streams
        </Menu.Item>
        <span className="top-header">
          <h1>TWITCH BOX</h1>
        </span>
        <Menu.Item as={Link} to="/login" position="right">
          Login
        </Menu.Item>
      </Menu>
    )}
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
