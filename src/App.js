import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSocket } from './actions'
import io from 'socket.io-client'
import Login from './components/Login'
import ChatBar from './components/chat/ChatBar'
import ChatContainer from './components/chat/ChatContainer'
import './app.css'

var socketURL = "http://localhost:3008"

class App extends Component {

    componentWillMount(){

        let socket = io(socketURL)
        this.props.setSocket(socket)
    }

    render() {

        if(this.props.user && this.props.chats){
            return (
                <div className="container">
                    <ChatBar />
                    <ChatContainer />
                </div>
            )
        }else{
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