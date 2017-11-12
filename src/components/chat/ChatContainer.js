import React, { Component } from 'react';
import Messages from './Messages'
import MessageInput from './MessageInput'
import { IS_TYPING } from '../../Events'
import { connect } from 'react-redux'

class ChatContainer extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            whoIsTyping: null
        }
    }
    
    componentWillMount() {
        this.props.socket.on(IS_TYPING, this.whoIsTyping)
    }

    componentWillUnmount() {
        console.log('unmount chatContainer')
        this.props.socket.off(IS_TYPING)
    }

    /**
     * call when a user is typing in a chat
     */
    whoIsTyping = (isTyping, username, chatId) => {
        //console.log('WhoIsTyping', isTyping, username, chatId)
        const { user, chats, activeChatIndex } = this.props

        if(isTyping && user.name !== username //if someone is typing and if it's not me
          && activeChatIndex != null //and if I have selected a chat
          && chats[activeChatIndex].id === chatId){ //and I select the chat where someone is typing

            this.setState({ whoIsTyping: username }) //set the name of the person
        }else{
            this.setState({ whoIsTyping: null }) //if nobody is typing
        }
    }

    render() {

        if(this.props.activeChatIndex != null){ //if I selected a chat
            return (
                <div className="chat-container">
                    <Messages  />
                    <div className="isTyping-container"> 
                        { this.state.whoIsTyping ? this.state.whoIsTyping + ' is typing...' :  null } 
                    </div>
                    <MessageInput />
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