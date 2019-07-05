import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import userTwitchInfo from './usertwitchinfo'
import multistreams from './multistreams'
import users from './users'
import clip from './clip'

const reducer = combineReducers({
  user,
  userTwitchInfo,
  multistreams,
  users,
  clip
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './usertwitchinfo'
export * from './multistreams'
export * from './users'
export * from './clip'
