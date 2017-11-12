import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSocket } from './actions'
import io from 'socket.io-client'
import Login from './components/Login'
import SideBar from './components/chat/SideBar'
import ChatContainer from './components/chat/ChatContainer'
import './app.css'

var socketURL = (process.env.NODE_ENV === "production") ? 
    "https://react-chat-server-api.herokuapp.com/" : "http://localhost:3008"

class App extends Component {

    componentWillMount(){

        let socket = io(socketURL) //connect the socket client to the server
        //console.log(socketURL, process.env.NODE_ENV);
        this.props.setSocket(socket) //set the socket in the store
    }

    render() {
        //if the user and all chats is set (if I submit a login) show the chat
        if(this.props.user && this.props.chats){
            return (
                <div className="container">
                    <SideBar />
                    <ChatContainer />
                </div>
            )
        }else{ //if no user, show the login page
            return (
                <div className="container">
                    <Login />
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        chats: state.chats
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setSocket: setSocket
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);