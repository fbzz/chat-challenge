const express = require('express')

const app = express()

const server = require('http').createServer(app)

const io = require('socket.io')(server)

const port = 3001 || process.env.PORT

io.on('connection', socket => {


  socket.on('userMessage', newMessage => {
    console.log(newMessage);
    socket.broadcast.emit('newMessage', newMessage)
  })
  socket.on('newUser', newUser => {
    socket.broadcast.emit('newUserJoined', newUser)
  })
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})