import React, { Component } from 'react';

class ChatContainer extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            
        }
    }
    



    render() {
        const { selectedChat } = this.props

        if(selectedChat){
            return (
                <div>
                    { this.props.selectedChat.name }
                </div>
            )
        }else{
            return (
                <div>
                    Choose a chat :)    
                </div>
            );
        }
        
    }
}

export default ChatContainer;