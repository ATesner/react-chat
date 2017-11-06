import React, { Component } from 'react'
import { CREATE_CHAT, LOGOUT } from '../../Events'

class ChatBar extends Component {

    constructor(props) {
        super(props);
        
        this.state = {

        }
    }

    handleNewChat = (e) => {
        e.preventDefault()
        let chatName = e.target.chatName.value;
        if(chatName.length > 0){
            console.log("Add chat", chatName)
            this.props.socket.emit(CREATE_CHAT, chatName)
            e.target.chatName.value = ""
        }
    }

    logout = () => {
        console.log("logout", this.props.user.name)
        const { socket, user } = this.props
        socket.emit(LOGOUT, user)
    }

    render() {

        return (
            <div className="menubar-container">
                <h3> React Chat </h3>
                <form onSubmit={this.handleNewChat}>
                    <input className="form-control" type="text" name="chatName" placeholder="Add a new chat" />
                    <input className="form-control" type="submit" value="Create" />
                    <div className="error"> { this.props.chatExist ? 'Chat already exist': null} </div>
                </form>
                <hr/>
                <h4> Chat List </h4>
                <ul className="list-group">
                    {
                        this.props.chats.map((chat, index) => {
                            return(
                                <li className="chatList" key={chat.id} onClick={this.props.handleSelectChat.bind(this,index)}
                                 > {chat.name} </li>
                            )

                        })
                    }
                    
                </ul>
                <div className="user-container">
                    <div>Your name: { this.props.user.name}</div>
                    <button className="btn btn-block btn-danger" onClick={this.logout}>Logout</button>
                </div>
            </div>
        );
    }
}

export default ChatBar;