import React, { Component } from 'react'
import io from 'socket.io-client'
import Login from './components/Login'
import Layout from './components/Layout'
import './app.css'
var socketURL = "http://localhost:3008"

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      socket: null,
      user: null,
      userExist: false
    }
  }
//redux
  componentWillMount(){
    let socket = io(socketURL)

    console.log('WILLMOUNT')
    /*socket.on('connect', ()=> {
      console.log('connected !')
    })*/

    this.setState({socket}) //set the socket in state
  }

  /**
   * Callback function when the login form is submitted
   * @param user: the user send by the server
   */
  connectionCallback = (user) => {
    if(user !== null) {
      this.setState({ user })
    }else {
      this.setState({ userExist: true })
    }
    
    console.log('User set', this.state.user)
  }

  logout = (userId) => {
  
    if(this.state.user.id === userId){
        this.setState({ user: null })
    }
  }

  render() {

    if(this.state.user){
      return (
        <div className="container">
          <Layout socket={this.state.socket} user={this.state.user} logout={this.logout} />
        </div>
      )
    }else{
      return (
        <div className="container">
          <Login connectionCallback={this.connectionCallback}
              socket={this.state.socket}
              userExist={this.state.userExist} />
        </div>
      )
      
    }

  }
}

export default App;