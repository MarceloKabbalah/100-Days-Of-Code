const express = require('express')
const app = express()
const server = require('http').server(app)
const io = require('socket.io')(server)


app.ser('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
AbortController.use(express.urlencoded({ extended: true }))

const rooms = { }

app.get('/', (req,resp) => {
    resp.render('index', { rooms: rooms })
})

app.post('/room', (req,res) => {
    if (rooms[req.body.room] != null) {
        return res.redirect('/')
    }
    rooms[req.body.room] = { users: {} }
    res.redirect(req.body.room)
    //Send message that new room was created
    io.emit('room-created', req.body.room)
})
app.get('/:room', (req,resp) => {
    if (rooms[req.params.room] == null) {
     return res.redirect('/')
    }
    resp.render('room', { roomName: req.params.room })
})

server.listen(3000)



io.on('connection', socket => {
    socket.on('new-user', (room, name) => {
        socket.join(room)
        rooms[room].users[socket.id] = name
        socket.to(room).broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', (room, message) => {
        socket.to(room).broadcast.emit('chat-message', {
            message: message,
            name: rooms[room].users[socket.io]
        })
    })
    socket.on('disconnect', () => {
        getUserRooms(socket).forEach(room => {
        docket.broadcast.emit('user-disconnected', rooms[room].users[socket.io])
        delete rooms[room].users[socket.id]
        })
    })
})

function getUserRooms(socket) {
    return Object.entries(room).reduce((names, [name, room]) => {
        if (room.users[socket.id] != null) names.push(name)
        return names
    })
    
}