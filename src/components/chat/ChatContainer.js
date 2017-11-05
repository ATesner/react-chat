import React, { Component } from 'react';
import Messages from './Messages'
import MessageForm from './MessageForm'
import { MESSAGE_SENT, IS_TYPING } from '../../Events'

class ChatContainer extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            selectedChat: null
        }
    }
    
    ComponentWillMount() {

        //this.props.socket.on(MESSAGE_SENT, )
    }

    addMessageTochat = (message) => {

        const { socket, user } = this.props
        console.log('EmitMessage', this.props.selectedChat.id,  message)
        socket.emit(MESSAGE_SENT, this.props.selectedChat.id, message, user.name)
        //this.setState({ selectedChat })
    }

    sendTyping = (isTyping) => {

        const { socket, user } = this.props

         //if the user is typing
            socket.emit(IS_TYPING, isTyping, user.name)
        
    }


    render() {
        const { selectedChat } = this.props
       
        if(selectedChat){
            return (
                <div>
                    { selectedChat.name }
                    <Messages messages={selectedChat.messages}/>
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