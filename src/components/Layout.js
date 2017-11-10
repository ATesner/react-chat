import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectChat, setChats } from '../actions/index'
import ChatBar from './chat/ChatBar'
import ChatContainer from './chat/ChatContainer'
import { GET_CHATS } from '../Events'

class Layout extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            //user: this.props.user,
            //socket: this.props.socket,
           // chatExist: false,
           // chats: [],
           // index: 0
        }
    }
 
    componentWillMount() {
       // const { socket } = this.props
      //  socket.on(MESSAGE_SENT, this.newMessageToChat)
        //socket.on(GET_CHATS, this.getChats)
      //  socket.on(LOGOUT, this.props.logout)
      //  socket.emit(GET_CHATS)
        this.props.socket.emit(GET_CHATS, (chats) =>{
            console.log('GET_CHATS', chats)
            this.props.setChats(chats)
        })
    }

    

  
    /*newMessageToChat = (chatId, newMessage) => {
        //console.log("newMessageToChat", chatId, message)
        let newChats = this.state.chats.map( (chat) => {

            if(chat.id === chatId){
                chat.messages.push(newMessage)
            }
            return chat
        })
        this.setState({ chats: newChats})

    }*/

   /* getChats = (chats) => {
        //console.log('addNewChat', chats)
        if(chats !== null){
            this.setState({ chats })
            this.setState({ chatExist: false })
        }else{
            this.setState({ chatExist: true })
        }
    }

    handleSelectChat = (index) => {
        console.log('Layout activeChat', this.props.activeChat)
        //console.log("SelectChat", this.state.chats[index])
        this.setState({ index: index })
    }*/


    render() {
        if(this.props.chats){
            return (
                <div className="container">
                        <ChatBar />
                        <ChatContainer />
                </div>
            )
        }else{
            return (
                <div>Loading Chats...</div>
            )
        }

    }
}

function mapStateToProps(state) {
    return {
        chats: state.chats,
        activeChat: state.activeChat,
        socket: state.socket
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectChat: selectChat,
        setChats: setChats
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Layout);