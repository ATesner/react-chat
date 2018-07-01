import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectChat, setUser, setChats, addChat } from '../../actions'
import { CREATE_CHAT, MESSAGE_SENT, LOGOUT } from '../../Events'

class SideBar extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            chatExist: false
        }
    }

    componentWillMount() {
        const { socket } = this.props
        socket.on(CREATE_CHAT, this.addChat)
        socket.on(MESSAGE_SENT, this.newMessageToChat)
    }

    componentWillUnmount() {
        const { socket } = this.props
        console.log('unmount sideBar')
        socket.off(CREATE_CHAT)
        socket.off(MESSAGE_SENT)   
    }

    /**
     * when a user add a chat
     */
    addChat = (newChat) => {

        this.props.addChat(newChat)
    }

    /**
     * When I submit a new chat
     */
    handleNewChat = (e) => {
        e.preventDefault()

        this.setState({ chatExist: false }); //set error to null
        let chatName = e.target.chatName.value; //get the chat name

        if(chatName.length > 0){
            //send the chatName to the server
            this.props.socket.emit(CREATE_CHAT, chatName, () => {
                //callback call by the server if the chat already exist
                this.setState({ chatExist: true });
            })
            e.target.chatName.value = ""
        }
    }

    /**
     * when there is a new message sent by someone
     * @param chatId: we will add the message to this chat
     * @param newMessage: the message sent
     */
    newMessageToChat = (chatId, newMessage) => {

        let newChats = this.props.chats.map( (chat) => { //fetch the chats

            if(chat.id === chatId){ //if this is the chat concerned by the new message
                chat.messages.push(newMessage) //add the new message to this chat
            }
            return chat //return the chat
        })
        this.props.setChats(newChats) //update all the chats (with the new message)
    }

    /**
     * when I click on the logout button
     */
    logout = () => {

        const { socket, user } = this.props
        socket.emit(LOGOUT, user) //send logout with my name the server
        this.props.selectChat(null)
        this.props.setChats(null)
        this.props.setUser(null) //set the user to null (redirect to login page)
    }

    render() {

        return (
            <div className="menubar-container">
                <h3 className="title"> BiblioTech Chat </h3>
                <form onSubmit={this.handleNewChat}>
                    <input className="form-control" type="text" name="chatName" placeholder="Add a new room" required/>
                    <input className="form-control" type="submit" value="Create Room" />
                    <div className="error"> { this.state.chatExist ? 'Chat already exist': null} </div>
                </form>
                <hr/>
                <h4 className="subtitle"> Room List </h4>
                <ul className="list-group">
                    {
                        this.props.chats.map((chat, index) => { //fetch the chats list
                            return(
                                <li className="list-chat-item" key={chat.id} 
                                    onClick={ () => this.props.selectChat(index) } > 
                                    <span className="title">{chat.name}</span>
                                </li>
                            )

                        })
                    }
                    
                </ul>
                <div className="user-container">
                    <div className="subtitle">Your name: { this.props.user.name}</div>
                    <button className="btn btn-block btn-danger" onClick={this.logout}>Logout</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        chats: state.chats,
        socket: state.socket
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectChat: selectChat,
        setUser: setUser,
        setChats: setChats,
        addChat: addChat
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SideBar);