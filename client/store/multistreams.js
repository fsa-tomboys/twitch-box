import axios from 'axios'

// action types

const SET_MULTISTREAMS = 'SET_MULTISTREAMS'
const ADD_MULTISTREAM = 'ADD_MULTISTREAM'

// define initial state
const initialState = []

// define action creator
export const setMultiStreams = streams => ({
  type: SET_MULTISTREAMS,
  streams
})
