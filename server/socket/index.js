module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.on('newThumb', uniqueCanvas => {
      io.emit('addThumb', uniqueCanvas)
    })
    socket.on('newHeart', uniqueCanvas => {
      io.emit('addHeart', uniqueCanvas)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
