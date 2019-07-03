import io from 'socket.io-client'
import {SSL_OP_NO_TICKET} from 'constants'
import {UniqueConstraintError} from 'sequelize/types'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})
socket.on('displayCanvas', uniqueCanvas => {
  const canvas = document.getElementById(uniqueCanvas)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = 'green'
  ctx.fillRect(10, 10, 150, 100)
})
socket.on('addToCanvas', uniqueCanvas => {
  const canvas = document.getElementById(uniqueCanvas)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'blue'
  ctx.strokeRect(10, 10, 50, 50)
})
export default socket
