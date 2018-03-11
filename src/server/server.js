const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { USER_CONNECTION, MESSAGE_SENT, CREATE_CHAT, GET_CHATS, IS_TYPING, LOGOUT } = require('../Events')
const PORT = process.env.PORT || 3008

app.use(express.static(__dirname + '/../../build'))

var usersConnected = []

var chats =  [
    {
        id: 0,
        name: "Public",
        messages: []
    }
]

server.listen(PORT, () => {
    console.log('Server listening on PORT ' + PORT)
})

io.on('connection', (socket) => {
    //console.log('Client Connecté !')

    socket.on('disconnect', () => {
        for(let i=0; i< usersConnected.length; i++){
            if(usersConnected[i].id == socket.id){
                console.log('DECO de ' + usersConnected[i].name)
                usersConnected.splice(i, 1)
            }
        }
    })

    /**
     * when a user submit the login form
     */
    socket.on(USER_CONNECTION, (username, callback) => {
        
        let userExist = false;
        usersConnected.forEach( (user) => {
            if(user.name === username){
                userExist = true
            }         
        })

        if(userExist){
            callback(null)
        }else{

            let user = {
                id: socket.id,
                name: username
            }
            usersConnected.push(user);
    
            callback(user, chats) //send the user object and chats to user   
        }
        console.log('Users connected', usersConnected)
    })

    /**
     * when user submit a message
     */
    socket.on(MESSAGE_SENT, (chatId, message, username) => {
        console.log("MESSAGE_SENT", chatId, message, username)
        let newMessage = {
            username: username,
            text: message
        }
        chats.forEach(chat => {
            if(chat.id === chatId){
                chat.messages.push(newMessage)
            }
        })

        io.emit(MESSAGE_SENT, chatId, newMessage)
    })

    /**
     * When a user create a chat
     */
    socket.on(CREATE_CHAT, (chatName, callback) => {
        //console.log("Chat create", chatName)
        let chatExist = false;
        chats.forEach((chat) => {
            if(chat.name === chatName){
                chatExist = true;        
            }
        })

        if(chatExist){
            callback()
        }else{
            
            let newchat = { id: chats.length, name: chatName, messages: []}
            chats.push(newchat)
            io.emit(CREATE_CHAT, newchat)
        }
    })

    socket.on(IS_TYPING, (isTyping, username, chatId) => {
        //console.log('ISTYPING', isTyping, username, chatId)
        io.emit(IS_TYPING, isTyping, username, chatId)
    })

    socket.on(LOGOUT, (user) => {

        usersConnected.forEach((user_connected, index) => {
            if(user_connected.id === user.id){
                usersConnected.splice(index)
            }
        })
        console.log('LOGOUT', usersConnected)
    })
})


