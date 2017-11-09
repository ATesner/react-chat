import React, { Component } from 'react';
import Messages from './Messages'
import MessageForm from './MessageForm'
import { MESSAGE_SENT, IS_TYPING } from '../../Events'
import { connect } from 'react-redux'

class ChatContainer extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            //selectedChat: null,
            whoIsTyping: null
        }
    }
    
    componentWillMount() {

        this.props.socket.on(IS_TYPING, this.whoIsTyping)
    }

    addMessageTochat = (message) => {

        const { socket, user } = this.props
        console.log('EmitMessage', this.props.activeChat.id,  message)
        socket.emit(MESSAGE_SENT, this.props.activeChat.id, message, user.name)
        //this.setState({ selectedChat })
    }

    sendTyping = (isTyping) => {

        const { socket, user, activeChat } = this.props

         //if the user is typing
        socket.emit(IS_TYPING, isTyping, user.name, activeChat.id )
        
    }

    whoIsTyping = (isTyping, username, chatId) => {
        //console.log('WhoIsTyping', isTyping, username, chatId)
        if(isTyping && this.props.user.name !== username && this.props.activeChat.id === chatId){
            this.setState({ whoIsTyping: username })
        }else{
            this.setState({ whoIsTyping: null })
        }
    }


    render() {
        const { activeChat } = this.props
       
        if(activeChat){
            return (
                <div className="chat-container">
                    <Messages user={this.props.user} 
                        messages={this.props.activeChat.messages} />
                    <div className="isTyping-container"> 
                        { this.state.whoIsTyping ? this.state.whoIsTyping + ' is typing...' :  null } 
                    </div>
                    <MessageForm addMessageTochat={this.addMessageTochat}
                      sendTyping={this.sendTyping}
                      whoIsTyping={this.state.whoIsTyping}/>
                </div>
            )
        }else{
            return (
                <div className="chat-ccontainer">
                    Choose a chat :)    
                </div>
            );
        }
        
    }
}

function mapStateToProps(state){
    return {
        activeChat: state.activeChat,
        user: state.user,
        socket: state.socket
    }
}

export default connect(mapStateToProps)(ChatContainer);