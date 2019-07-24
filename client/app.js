import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
// This is our Main component, in a sense. Every other component builds off of this
const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes />
    </div>
  )
}

export default App
