const server = require('http').createServer()
const io = require('socket.io')(server)
const { USER_CONNECTION, MESSAGE_SENT, CREATE_CHAT, GET_CHATS } = require('../Events')
const PORT = process.env.PORT || 3008

var usersConnected = []

var chats =  [
    {
        id: 0,
        name: "public",
        messages: []
    }
]

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
     * To send all chats to users
     */
    socket.on(GET_CHATS, () => {
        io.emit(GET_CHATS, chats)
    })

    /**
     * when user submit a message
     */
    socket.on(MESSAGE_SENT, (chatId, message) => {
        console.log("MESSAGE_SENT", chatId, message)
        io.emit(`${MESSAGE_SENT}`, chatId, message)
    })

    /**
     * When a user create a chat
     */
    socket.on(CREATE_CHAT, (chatName) => {
        console.log("Chat create", chatName)
        let newchat = { id: chats.length, name: chatName, messages: []}
        chats.push(newchat)
        io.emit(GET_CHATS, chats)
    })

})


