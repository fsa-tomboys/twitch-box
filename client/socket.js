import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})
socket.on('clicked', () => {
  console.log('item was clicked')
})
export default socket
