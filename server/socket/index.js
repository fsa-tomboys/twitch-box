module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.on('displayCanvas', uniqueCanvas => {
      io.emit('showCanvas', uniqueCanvas)
    })
    socket.on('animation', uniqueCanvas => {
      io.emit('doAnimation', uniqueCanvas)
    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
