import React, { Component } from 'react'
import io from 'socket.io-client'
import Login from './components/Login'
import Layout from './components/Layout'
import './app.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setUser, setSocket } from './actions'

var socketURL = "http://localhost:3008"

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
     // socket: null,
      //user: null,
      userExist: false
    }
  }
//redux
  componentWillMount(){
    let socket = io(socketURL)

    console.log('WILLMOUNT', this.props.store)
    /*socket.on('connect', ()=> {
      console.log('connected !')
    })*/
    this.props.setSocket(socket)
    //this.setState({socket}) //set the socket in state
  }

  /**
   * Callback function when the login form is submitted
   * @param user: the user send by the server
   */
  connectionCallback = (user) => {
    if(user !== null) {
      
      this.props.setUser(user);
     // this.setState({ user })
    }else {
      this.setState({ userExist: true })
    }
    
    console.log('User set', this.state.user)
  }

  logout = (userId) => {
    console.log('acticheChat', this.props.store.activeChat)
    if(this.state.user.id === userId){
       // this.setState({ user: null })
    }
  }

  render() {

    if(this.props.user){
      return (
        <div className="container">
          <Layout socket={this.props.socket} logout={this.logout} />
        </div>
      )
    }else{
      return (
        <div className="container">
          <Login connectionCallback={this.connectionCallback}
              socket={this.props.socket}
              userExist={this.state.userExist} />
        </div>
      )
      
    }

  }
}

function mapStateToProps(state){
  return {
    user: state.user,
    socket: state.socket
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    setUser: setUser,
    setSocket: setSocket
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);