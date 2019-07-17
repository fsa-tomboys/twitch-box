import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import Navbar from './navbar'
/**
 * COMPONENT
 */
// This form helps handle logging in with Twitch
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <Navbar pos="navbar-login" />

      <div className="login-link-twitch">
        <div className="login-signup-box">
          <span className="welcome-text-login">
            <h2>Welcome to Twitch Box!</h2>
          </span>
          <a className="login-link-twitch-text-box" href="/auth/twitch">
            <span className="login-link-twitch-text-itself">
              <span>Log in with Twitch</span>
            </span>
          </a>
          <span className="sign-up-question">
            Need to create Twitch account?
            <a className="sign-up-twitch" href="https://www.twitch.tv/signup">
              {' '}
              Sign up here
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
