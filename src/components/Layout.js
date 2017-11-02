import React, { Component } from 'react';
import ChatBar from './chat/ChatBar'
import ChatContainer from './chat/ChatContainer'

class Layout extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            selectedChat: null,
            chats: [
                {
                    id: 1,
                    name: "public"
                }
            ]
        }
    }
    
    handleSelectChat = (index) => {
        
        console.log("SelectChat", this.state.chats[index])
        this.setState({ selectedChat: this.state.chats[index] })
    }


    render() {

        return (
            <div>
                <div className="col-sm-4">
                    <ChatBar handleSelectChat={this.handleSelectChat}
                            chats={this.state.chats} />
                </div>
                <div className="col-sm-8">
                    <ChatContainer selectedChat={this.state.selectedChat} />
                </div>
            </div>
        )
    }
}

export default Layout;