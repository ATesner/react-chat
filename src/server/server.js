const server = require('http').createServer()
const io = require('socket.io')(server)
const { USER_CONNECTION, MESSAGE_SENT, CREATE_CHAT, GET_CHATS, IS_TYPING } = require('../Events')
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
    //console.log('Client Connecté !')

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
    
            callback(user)        
        }
        console.log('Users connected', usersConnected)
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
    socket.on(CREATE_CHAT, (chatName) => {
        //console.log("Chat create", chatName)
        let chatExist = false;
        chats.forEach((chat) => {
            if(chat.name === chatName){
                chatExist = true;        
            }
        })

        if(chatExist){
            io.emit(GET_CHATS, null)
        }else{
            
            let newchat = { id: chats.length, name: chatName, messages: []}
            chats.push(newchat)
            io.emit(GET_CHATS, chats)
        }
    })

    socket.on(IS_TYPING, (isTyping, username, chatId) => {
        console.log('ISTYPING', isTyping, username, chatId)
        io.emit(IS_TYPING, isTyping, username, chatId)
    })

})


