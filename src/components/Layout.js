import React, { Component } from 'react';
import ChatBar from './chat/ChatBar'
import ChatContainer from './chat/ChatContainer'
import { MESSAGE_SENT } from '../Events'

class Layout extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            user: this.props.user,
            socket: this.props.socket,
            selectedChat: null,
            chats: this.props.chats
        }
    }
 
    componentDidMount() {

        this.state.socket.on(`${MESSAGE_SENT}`, this.newMessageToChat)
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

    handleSelectChat = (index) => {
        
        //console.log("SelectChat", this.state.chats[index])
        this.setState({ selectedChat: this.state.chats[index] })
    }


    render() {

        return (
            <div>
                <div className="col-sm-4">
                    <ChatBar handleSelectChat={this.handleSelectChat}
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