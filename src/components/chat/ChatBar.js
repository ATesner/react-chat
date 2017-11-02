import React, { Component } from 'react';

class ChatBar extends Component {

    constructor(props) {
        super(props);
        
        this.state = {

        }
    }
    
    render() {

        return (
            <div>
                <h3> React Chat </h3>
                <ul>
                    {
                        this.props.chats.map((chat, index) => {
                            return(
                                <li key={chat.id} onClick={this.props.handleSelectChat.bind(this,index)}
                                 > {chat.name} </li>
                            )

                        })
                    }
                    
                </ul>
            </div>
        );
    }
}

export default ChatBar;