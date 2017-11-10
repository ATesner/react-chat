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

   /* addMessageTochat = (message) => {

        const { socket, user } = this.props
        console.log('EmitMessage', this.props.activeChat.id,  message)
        socket.emit(MESSAGE_SENT, this.props.activeChat.id, message, user.name)
        //this.setState({ selectedChat })
    }*/

    sendTyping = (isTyping) => {

        const { socket, user, chats, activeChatIndex } = this.props

         //if the user is typing
        socket.emit(IS_TYPING, isTyping, user.name, chats[activeChatIndex].id )
        
    }

    whoIsTyping = (isTyping, username, chatId) => {
        //console.log('WhoIsTyping', isTyping, username, chatId)
        if(isTyping && this.props.user.name !== username && this.props.chats[this.props.activeChatIndex].id === chatId){
            this.setState({ whoIsTyping: username })
        }else{
            this.setState({ whoIsTyping: null })
        }
    }


    render() {
        const { activeChatIndex } = this.props
        console.log('maiiiis heuu', activeChatIndex)
        if(activeChatIndex != null){
            return (
                <div className="chat-container">
                    <Messages  />
                    <div className="isTyping-container"> 
                        { this.state.whoIsTyping ? this.state.whoIsTyping + ' is typing...' :  null } 
                    </div>
                    <MessageForm
                      sendTyping={this.sendTyping}
                      whoIsTyping={this.state.whoIsTyping}/>
                </div>
            )
        }else{
            return (
                <div className="chat-container">
                    Choose a chat :)    
                </div>
            );
        }
        
    }
}

function mapStateToProps(state){
    return {
        activeChatIndex: state.activeChatIndex,
        chats: state.chats,
        user: state.user,
        socket: state.socket
    }
}

export default connect(mapStateToProps)(ChatContainer);