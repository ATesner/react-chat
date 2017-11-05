import React, { Component } from 'react';

class MessageForm extends Component {

    constructor(props) {
        super(props);

         this.state = {
             lastTypingDate: null
         }
    }
    
    
    handleMessageFormSubmit = (e) => {
        e.preventDefault()

        this.props.addMessageTochat(e.target.message.value)
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
            <div>
                <form onSubmit={this.handleMessageFormSubmit} >
                    <input type="text" name="message" placeholder="Type here" onKeyDown={this.handleKeyDown} />
                    <button type="submit">Send</button>
                </form>
            </div>
        );
    }
}

export default MessageForm;