import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectChat, setUser, setChats, addChat } from '../../actions'
import { CREATE_CHAT, MESSAGE_SENT, LOGOUT } from '../../Events'

class ChatBar extends Component {

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

    /**
     * when a user add a chat
     */
    addChat = (newChat) => {

        this.props.addChat(newChat)
    }

    handleNewChat = (e) => {
        e.preventDefault()
        this.setState({ chatExist: false });
        let chatName = e.target.chatName.value;
        if(chatName.length > 0){

            this.props.socket.emit(CREATE_CHAT, chatName, () => {
                this.setState({ chatExist: true });
            })
            e.target.chatName.value = ""
        }
    }

    newMessageToChat = (chatId, newMessage) => {
        //console.log("newMessageToChat", chatId, message)
        let newChats = this.props.chats.map( (chat) => {

            if(chat.id === chatId){
                chat.messages.push(newMessage)
            }
            return chat
        })
        console.log('MESSAGE ADDED', newChats)
        this.props.setChats(newChats)
    }

    logout = () => {

        const { socket, user } = this.props
        socket.emit(LOGOUT, user)
        this.props.setUser(null)
    }

    render() {

        return (
            <div className="menubar-container">
                <h3> React Chat </h3>
                <form onSubmit={this.handleNewChat}>
                    <input className="form-control" type="text" name="chatName" placeholder="Add a new chat" />
                    <input className="form-control" type="submit" value="Create" />
                    <div className="error"> { this.state.chatExist ? 'Chat already exist': null} </div>
                </form>
                <hr/>
                <h4> Chat List </h4>
                <ul className="list-group">
                    {
                        this.props.chats.map((chat, index) => {
                            return(
                                <li className="chatList" key={chat.id} 
                                    onClick={ () => this.props.selectChat(index) } > 
                                    {chat.name}
                                </li>
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

export default connect(mapStateToProps, matchDispatchToProps)(ChatBar);