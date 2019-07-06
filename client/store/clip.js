import axios from 'axios'

// action types

const ADD_CLIP = 'ADD_CLIP'

// define initial state
const initialState = []

// define action creator

export const addClip = clip => ({
  type: ADD_CLIP,
  clip
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

// define reducer
const clipReducer = function(state = initialState, action) {
  switch (action.type) {
    case ADD_CLIP:
      console.log(action.clip)
      return [...state, action.clip]
    default:
      return state
  }
}

export default clipReducer
