import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

const NavbarComponent = ({handleClick, isLoggedIn}) => (
  <div>
    {isLoggedIn ? (
      <Navbar color="light" light expand="md">
        <Collapse isOpen={false} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/featured">Featured Streams</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/customize">Customize Streams</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/list">View Created Streams</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={handleClick}>
                Logout
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                View My Info
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>My profile</DropdownItem>
                <DropdownItem>My multistreams</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>My clips</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    ) : (
      <Navbar color="light" light expand="md">
        <Collapse isOpen={false} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/featured">Featured Streams</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/customize">Customize Streams</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
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

export default connect(mapState, mapDispatch)(NavbarComponent)

/**
 * PROP TYPES
 */
NavbarComponent.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
