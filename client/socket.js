import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})
socket.on('showCanvas', uniqueCanvas => {
  const canvas = document.getElementById(uniqueCanvas)
  canvas.textContent = Number(canvas.textContent) + 1
})
export default socket
