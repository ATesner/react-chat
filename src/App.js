import React, { Component } from 'react'
import io from 'socket.io-client'
import Login from './components/Login'
import Layout from './components/Layout'

var socketURL = "http://localhost:3008"

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      socket: null,
      user: null
    }
  }

  componentDidMount(){
    let socket = io(socketURL)

    socket.on('connect', ()=> {
      console.log('connected !')
    })

    this.setState({socket}) //set the socket in state
  }

  /**
   * Callback function when the login form is submitted
   * @param user: the user send by the server
   */
  connectionCallback = ({user}) => {
    this.setState({ user })
    console.log('User set', this.state.user)
  }

  render() {

    if(this.state.user){
      return (
        <div>
          <Layout />
        </div>
      )
    }else{
      return (
        <div>
          <Login connectionCallback={this.connectionCallback}
              socket={this.state.socket} />
        </div>
      )
      
    }

  }
}

export default App;