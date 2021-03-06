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
        console.log('unmount chatContainerrr')
        this.props.socket.off(IS_TYPING)
    }

    componentDidUpdate(){
        const { chatContainer } = this.refs;
        if(chatContainer){
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
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
            console.log()
            return (
                <div className="chat-container" ref="chatContainer">
                    <div className="chat-header">
                        <span className="subtitle">Room : {this.props.chats[this.props.activeChatIndex].name}</span>
                    </div>
                    <br/><br/><br/>
                    <Messages  />
                    <div className="isTyping-container"> 
                        { this.state.whoIsTyping ? this.state.whoIsTyping + ' is typing...' :  null } 
                    </div>
                    <MessageInput />
                </div>
            )
        }else{
            return (
                <div className="default-container">
                   <span>Choose a room :)</span>
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