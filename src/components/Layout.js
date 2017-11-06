import React, { Component } from 'react';
import ChatBar from './chat/ChatBar'
import ChatContainer from './chat/ChatContainer'
import { MESSAGE_SENT, GET_CHATS } from '../Events'

class Layout extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            user: this.props.user,
            socket: this.props.socket,
            chatExist: false,
            chats: [],
            index: 0
        }
    }
 
    componentWillMount() {
        const { socket } = this.state
        socket.on(MESSAGE_SENT, this.newMessageToChat)
        socket.on(GET_CHATS, this.getChats)
        socket.emit(GET_CHATS)
    }

    componentDidMount() {


    }

    newMessageToChat = (chatId, newMessage) => {
        //console.log("newMessageToChat", chatId, message)
        let newChats = this.state.chats.map( (chat) => {

            if(chat.id === chatId){
                chat.messages.push(newMessage)
            }
            return chat
        })
        this.setState({ chats: newChats})

    }

    getChats = (chats) => {
        //console.log('addNewChat', chats)
        if(chats !== null){
            this.setState({ chats })
            this.setState({ chatExist: false })
        }else{
            this.setState({ chatExist: true })
        }
    }

    handleSelectChat = (index) => {
        
        //console.log("SelectChat", this.state.chats[index])
        this.setState({ index: index })
    }


    render() {

        return (
            <div className="container">
                    <ChatBar handleSelectChat={this.handleSelectChat}
                            socket={this.state.socket}
                            chats={this.state.chats}
                            chatExist={this.state.chatExist}
                            user={this.props.user} />
                    <ChatContainer socket={this.state.socket} 
                            selectedChat={this.state.chats[this.state.index]}
                            user={this.state.user} />
            </div>
        )
    }
}

export default Layout;