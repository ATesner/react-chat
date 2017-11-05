import React, { Component } from 'react'
import { CREATE_CHAT } from '../../Events'

class ChatBar extends Component {

    constructor(props) {
        super(props);
        
        this.state = {

        }
    }
    
    handleNewChat = (e) => {
        e.preventDefault()
        console.log("Add chat", e.target.chatName.value)
        this.props.socket.emit(CREATE_CHAT, e.target.chatName.value)
        e.target.chatName.value = ""
    }

    render() {

        return (
            <div>
                <h3> React Chat </h3>
                <form onSubmit={this.handleNewChat}>
                    <input type="text" name="chatName" placeholder="add a new chat" />
                    <input type="submit" value="Create" />
                    <div className="error"> { this.props.chatExist ? 'Chat already exist': null} </div>
                </form>
                <ul>
                    {
                        this.props.chats.map((chat, index) => {
                            return(
                                <li className="chatList" key={chat.id} onClick={this.props.handleSelectChat.bind(this,index)}
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