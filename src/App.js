import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSocket } from './actions'
import io from 'socket.io-client'
import Login from './components/Login'
import Layout from './components/Layout'
import './app.css'

var socketURL = "http://localhost:3008"

class App extends Component {

    componentWillMount(){

        let socket = io(socketURL)
        this.props.setSocket(socket)
    }

    render() {

        if(this.props.user){
            return (
                <div className="container">
                    <Layout />
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
        user: state.user
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setSocket: setSocket
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);