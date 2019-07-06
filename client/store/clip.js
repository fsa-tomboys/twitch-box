import axios from 'axios'

// action types

const ADD_CLIP = 'ADD_CLIP'
const GET_CLIPS = 'GET_CLIPS'

// define initial state
const initialState = []

// define action creator

export const addClip = clip => ({
  type: ADD_CLIP,
  clip
})

export const getClips = clips => ({
  type: GET_CLIPS,
  clips
})
// define thunk method

export const createClip = (clip, id, name) => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/clip', {
        newClip: clip,
        userId: id,
        clipName: name
      })
      console.log(res.data)
      dispatch(addClip(res.data))
    } catch (error) {
      console.log('Error inside thunk method addClip: ', error)
    }
  }
}

export const fetchClips = userId => {
  console.log('USERID ', userId)
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/clip/${userId}`)
      console.log('DATA ', data)
      dispatch(getClips(data))
    } catch (error) {
      console.log('Error inside thunk method fetchClips: ', error)
    }
  }
}

// define reducer
const clipReducer = function(state = initialState, action) {
  console.log('in clip reducer', action.type)
  switch (action.type) {
    case ADD_CLIP:
      console.log(action.clip)
      return [...state, action.clip]
    case GET_CLIPS:
      return action.clips
    default:
      return state
  }
}

export default clipReducer
