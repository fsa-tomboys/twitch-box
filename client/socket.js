import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})
socket.on('showCanvas', uniqueCanvas => {
  const canvas = document.getElementById(uniqueCanvas)
  const ctx = canvas.getContext('2d')
  let base_image = new Image()
  base_image.src =
    'https://upload.wikimedia.org/wikipedia/commons/e/ef/Thumbs_up_font_awesome.svg'
  base_image.onload = function() {
    ctx.drawImage(base_image, 0, 0)
  }
})
export default socket
