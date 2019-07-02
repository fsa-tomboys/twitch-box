import axios from 'axios'

// action types

const SET_MULTISTREAMS = 'SET_MULTISTREAMS'
const ADD_MULTISTREAM = 'ADD_MULTISTREAM'
const DELETE_MULTISTREAM = 'DELETE_MULTISTREAM'
const UPDATE_MULTISTREAM = 'UPDATE_MULTISTREAM'

// define initial state
const initialState = []

// define action creator
export const setMultiStreams = multistreams => ({
  type: SET_MULTISTREAMS,
  multistreams
})

export const addMutistream = multistream => ({
  type: ADD_MULTISTREAM,
  multistream
})

export const deleteMultistream = id => ({
  type: DELETE_MULTISTREAM,
  id
})

export const updateMultistream = multistream => ({
  type: UPDATE_MULTISTREAM,
  multistream
})

// define thunk method
export const fetchMultistreams = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/multistreams')
      dispatch(setMultiStreams(data))
    } catch (error) {
      console.log('Error inside thunk method fetchMultistreams: ', error)
    }
  }
}

export const createMultistream = multistream => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/multistreams', multistream)
      dispatch(addMutistream(res.data))
    } catch (error) {
      console.log('Error inside thunk method createMultistream: ', error)
    }
  }
}

export const removeMultistream = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/multistreams/${id}`)
      dispatch(deleteMultistream(id))
    } catch (error) {
      console.log('Error inside thunk method removeMultistream: ', error)
    }
  }
}

export const putMultistream = multistream => {
  return async dispatch => {
    try {
      await axios.put(`/api/multistreams/${multistream.id}`, multistream)
      const multistreamWithAssociation = await axios.get(
        `/api/multistreams/${multistream.id}`
      )
      dispatch(updateMultistream(multistreamWithAssociation))
    } catch (error) {
      console.log('Error inside thunk method putMultistream: ', error)
    }
  }
}

// define reducer
const multistreamReducer = function(state = initialState, action) {
  switch (action.type) {
    case SET_MULTISTREAMS:
      return action.multistreams
    case ADD_MULTISTREAM:
      return [...state, action.multistream]
    case DELETE_MULTISTREAM:
      return state.filter(elem => elem.id)
    case UPDATE_MULTISTREAM:
      return state.map(elem => {
        if (elem.id === action.multistream.id) return action.multistream
        else return elem
      })
    default:
      return state
  }
}

export default multistreamReducer
