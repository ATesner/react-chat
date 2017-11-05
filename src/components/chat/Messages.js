import React, { Component } from 'react';

class Messages extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            
        }
    }
    
   /* componentWillReceiveProps(nextProps) {
        console.log('newProps', nextProps)
        this.setState({ messages: nextProps.messages }); 
        console.log('NEWSTATE', this.state.messages) 
    }*/

    render() {
        const { messages } = this.props

        return (
            <div>
                {
                    messages.map((message, index) => {
                        return (
                            <div key={index}>
                            <span> {message.username}</span>
                            <p>{ message.text }</p>
                            </div>
                        )

                    })
                }
                <div> { this.props.whoIsTyping ? this.props.whoIsTyping + ' is Typing...' :  null } </div>
            </div>
        );
    }
}

export default Messages;