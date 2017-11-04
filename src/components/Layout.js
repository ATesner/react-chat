import React, { Component } from 'react';
import ChatBar from './chat/ChatBar'
import ChatContainer from './chat/ChatContainer'
import { MESSAGE_SENT, CREATE_CHAT, GET_CHATS } from '../Events'

class Layout extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            user: this.props.user,
            socket: this.props.socket,
            selectedChat: null,
            chats: []
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

    newMessageToChat = (chatId, message) => {
        //console.log("newMessageToChat", chatId, message)
        let newChats = this.state.chats.map( (chat) => {

            if(chat.id === chatId){
                chat.messages.push(message)
            }
            return chat
        })
        this.setState({ chats: newChats})
    }

    getChats = (chats) => {
        console.log('addNewChat', chats)
        
        this.setState({ chats })
    }

    handleSelectChat = (index) => {
        
        //console.log("SelectChat", this.state.chats[index])
        this.setState({ selectedChat: this.state.chats[index] })
    }


    render() {

        return (
            <div>
                <div className="col-sm-4">
                    <ChatBar handleSelectChat={this.handleSelectChat}
                            socket={this.state.socket}
                            chats={this.state.chats} />
                </div>
                <div className="col-sm-8">
                    <ChatContainer socket={this.state.socket} 
                            selectedChat={this.state.selectedChat} />
                </div>
            </div>
        )
    }
}

export default Layout;