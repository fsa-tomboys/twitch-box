import axios from 'axios'

// ACTION TYPES

const GET_TWITCH_USER = 'GET_TWITCH_USER'
const GET_USER_CHANNELS = 'GET_USER_CHANNELS'

// initial states
const initialState = {
  twitchUser: {},
  channels: []
}

// action creators
const getTwitchUser = twitchUser => ({type: GET_TWITCH_USER, twitchUser})
const getUserChannels = channels => ({type: GET_USER_CHANNELS, channels})

// thunk methods
export const fetchTwitchUser = twitchUserId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/usertwitchinfo/${twitchUserId}`)
      // console.log('res.data: ', res.data)
      //format: {bio, created_at, display_name, logo, name, type, updated_at, _id}
      dispatch(getTwitchUser(res.data))
    } catch (error) {
      console.log('Error inside thunk method fetchTwitchUser: ', error)
    }
  }
}

export const fetchUserChannels = twitchUserId => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `/api/usertwitchinfo/channels/${twitchUserId}`
      )
      // format: array of objects
      dispatch(getUserChannels(res.data))
    } catch (error) {
      console.log('Error inside thunk method fetchUserChannels: ', error)
    }
  }
}

// define reducer
const twitchUserInfoReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_TWITCH_USER:
      return {...state, twitchUser: action.twitchUser}
    case GET_USER_CHANNELS:
      return {...state, channels: action.channels.channels}
    default:
      return state
  }
}

export default twitchUserInfoReducer
