import axios from 'axios'

// ACTION TYPES

const GET_TWITCH_USER = 'GET_TWITCH_USER'
const GET_USER_CHANNELS = 'GET_USER_CHANNELS'
const GET_CHANNELS_ONLINE_OFFLINE = 'GET_CHANNELS_ONLINE_OFFLINE'

// initial states
const initialState = {
  twitchUser: {},
  channels: [],
  isOnline: []
}

// action creators
const getTwitchUser = twitchUser => ({type: GET_TWITCH_USER, twitchUser})
const getUserChannels = channels => ({type: GET_USER_CHANNELS, channels})
const getChannelsOnOffLineStatus = statusArr => ({
  type: GET_CHANNELS_ONLINE_OFFLINE,
  statusArr
})

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
      // console.log('res.data of fetch channels: ', res.data)
      dispatch(getUserChannels(res.data.channels))
      const initialArr = new Array(res.data.channels.length).fill(false)
      dispatch(getChannelsOnOffLineStatus(initialArr))
    } catch (error) {
      console.log('Error inside thunk method fetchUserChannels: ', error)
    }
  }
}

// check streams one by one, set online or offline label for each stream
export const fetchChannelsStreamsStatus = channels => {
  return async dispatch => {
    try {
      // console.log('channels before fetch status: ', channels)
      const {data} = await axios.post(
        `/api/usertwitchinfo/channels/streams`,
        channels
      )
      dispatch(getChannelsOnOffLineStatus(data))
    } catch (error) {
      console.log('Error inside thunk method fetchChannelStreamStatus: ', error)
    }
  }
}

// define reducer
const twitchUserInfoReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_TWITCH_USER:
      return {...state, twitchUser: action.twitchUser}
    case GET_USER_CHANNELS:
      return {...state, channels: action.channels}
    case GET_CHANNELS_ONLINE_OFFLINE:
      return {...state, isOnline: action.statusArr}
    default:
      return state
  }
}

export default twitchUserInfoReducer
