import React, { Component } from 'react';
import Messages from './Messages'
import MessageForm from './MessageForm'
import { MESSAGE_SENT, IS_TYPING } from '../../Events'

class ChatContainer extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            selectedChat: null,
            whoIsTyping: null
        }
    }
    
    componentWillMount() {

        this.props.socket.on(IS_TYPING, this.whoIsTyping)
    }


    addMessageTochat = (message) => {

        const { socket, user } = this.props
        console.log('EmitMessage', this.props.selectedChat.id,  message)
        socket.emit(MESSAGE_SENT, this.props.selectedChat.id, message, user.name)
        //this.setState({ selectedChat })
    }

    sendTyping = (isTyping) => {

        const { socket, user, selectedChat } = this.props

         //if the user is typing
            socket.emit(IS_TYPING, isTyping, user.name, selectedChat.id )
        
    }

    whoIsTyping = (isTyping, username, chatId) => {
        console.log('WhoIsTyping', isTyping, username, chatId)
        if(isTyping && this.props.user.name !== username && this.props.selectedChat.id === chatId){
            this.setState({ whoIsTyping: username })
        }else{
            this.setState({ whoIsTyping: null })
        }
    }


    render() {
        const { selectedChat } = this.props
       
        if(selectedChat){
            return (
                <div>
                    { selectedChat.name }
                    <Messages messages={selectedChat.messages} whoIsTyping={this.state.whoIsTyping}/>
                    <MessageForm addMessageTochat={this.addMessageTochat}
                      sendTyping={this.sendTyping}/>
                </div>
            )
        }else{
            return (
                <div>
                    Choose a chat :)    
                </div>
            );
        }
        
    }
}

export default ChatContainer;