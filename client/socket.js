import io from 'socket.io-client'
import {SSL_OP_NO_TICKET} from 'constants'
import {UniqueConstraintError} from 'sequelize/types'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})
socket.on('showCanvas', uniqueCanvas => {
  console.log('canvas is here', uniqueCanvas)
  const canvas = document.getElementById(uniqueCanvas)
  console.log(canvas)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = 'green'
  ctx.fillRect(10, 10, 150, 100)
})
export default socket
