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
        const { messages, user } = this.props

        return (
            <div className="message-container" >
                {
                    messages.map((message, index) => {
                        return (
                            <div className={(user.name !== message.username ? 'right' : '')} key={index}>
                            <div className="message-author"> 
                                { this.props.user.name === message.username ? 
                                    'Me :'
                                    :
                                    message.username + ' :'
                                } </div>
                            <p className={"message-text "}
                                style={{ backgroundColor: (user.name !== message.username) ? '#6bbcda' : '#ffffff'}}>{ message.text }</p>
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