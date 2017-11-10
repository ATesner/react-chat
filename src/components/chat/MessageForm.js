import React, { Component } from 'react';
import { connect } from 'react-redux'
import { MESSAGE_SENT } from '../../Events'

class MessageForm extends Component {

    constructor(props) {
        super(props);

         this.state = {
             lastTypingDate: null
         }
    }
    
    
    handleMessageFormSubmit = (e) => {
        e.preventDefault()

        let message = e.target.message.value
        const { socket, user, activeChatIndex, chats } = this.props
        console.log('EmitMessage', chats[activeChatIndex].id,  message)
        socket.emit(MESSAGE_SENT, chats[activeChatIndex].id, message, user.name)

        e.target.message.value = ""
    }

    handleKeyDown = (e) => {
        console.log('KeyUp', e.target.value)
        this.setState({ lastTypingDate: Date.now() }) //save the time when the user start typing
        this.props.sendTyping(true)

        setTimeout(()=> {
            //if the user did not type since 300ms
            if(Date.now() - this.state.lastTypingDate > 300) 
                this.props.sendTyping(false)
        }, 300)
    }

    render() {
        return (
            <div className="messageForm-container">
                <form onSubmit={this.handleMessageFormSubmit} className="messageForm-form" >
                    <input className="form-control" type="text" name="message" 
                        placeholder="Type here" onKeyDown={this.handleKeyDown} />

                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        socket: state.socket,
        user: state.user,
        activeChatIndex: state.activeChatIndex,
        chats: state.chats
    }
}

export default connect(mapStateToProps)(MessageForm);