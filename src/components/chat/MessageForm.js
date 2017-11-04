import React, { Component } from 'react';

class MessageForm extends Component {


    handleMessageFormSubmit = (e) => {
        e.preventDefault()

        this.props.addMessageTochat(e.target.message.value)
        e.target.message.value = ""
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleMessageFormSubmit} >
                    <input type="text" name="message" placeholder="Type here" />
                    <button type="submit">Send</button>
                </form>
            </div>
        );
    }
}

export default MessageForm;