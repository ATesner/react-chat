const server = require('http').createServer()
const io = require('socket.io')(server)
const { USER_CONNECTION, MESSAGE_SENT } = require('../Events')
const PORT = process.env.PORT || 3008

var usersConnected = []

server.listen(PORT, () => {
    console.log('Server listening on PORT ' + PORT)
})

io.on('connection', (socket) => {
    console.log('Client Connecté !')

    /**
     * when a user submit the login form
     */
    socket.on(USER_CONNECTION, (username, callback) => {
        
        let user = {
            id: socket.id,
            name: username
        }
        usersConnected.push(user);
        console.log('Users connected', usersConnected)
        callback({user})
    })

    /**
     * when user submit a message
     */
    socket.on(MESSAGE_SENT, (chatId, message) => {
        console.log("MESSAGE_SENT", chatId, message)
        io.emit(`${MESSAGE_SENT}`, chatId, message)
    })
})


