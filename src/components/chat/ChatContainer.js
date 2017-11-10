import React, { Component } from 'react';
import Messages from './Messages'
import MessageForm from './MessageForm'
import { IS_TYPING } from '../../Events'
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

    sendTyping = (isTyping) => {

        const { socket, user, chats, activeChatIndex } = this.props

         //if the user is typing
        socket.emit(IS_TYPING, isTyping, user.name, chats[activeChatIndex].id )
        
    }

    whoIsTyping = (isTyping, username, chatId) => {

        //console.log('WhoIsTyping', isTyping, username, chatId)
        const { user, chats, activeChatIndex } = this.props

        if(isTyping && user.name !== username && chats[activeChatIndex].id === chatId){
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
                    <MessageForm />
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