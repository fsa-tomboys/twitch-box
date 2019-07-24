import React from 'react'
import {connect} from 'react-redux'
import Navbar from './navbar'

//Login in/sign up with twitch component

const AuthForm = () => {
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

export const Login = connect()(AuthForm)
export const Signup = connect()(AuthForm)
