import React, { Component } from 'react';
import { connect } from 'react-redux'

class Messages extends Component {

    render() {
        const { chats, activeChatIndex, user } = this.props
        console.log('activeeeeee', chats[activeChatIndex])
        return (
            <div className="message-container" >
                {
                    chats[activeChatIndex].messages.map((message, index) => {
                        return (
                            <div className={(user.name !== message.username ? 'right' : '')} key={index}>
                            <div className="message-author"> 
                                { user.name === message.username ? 
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
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        chats: state.chats,
        activeChatIndex: state.activeChatIndex
    }
}

export default connect(mapStateToProps)(Messages);