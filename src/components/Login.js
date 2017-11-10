import React, { Component } from 'react'
import { USER_CONNECTION } from '../Events'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setUser } from '../actions'

class Login extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            userExist: false
        }
    }
    
    /**
     * when the form is submitted
     */
    handleSubmit = (e) => {
        e.preventDefault(); //stop the submission

        const { socket } = this.props //get the socket from app
        console.log('Connect user', e.target.surname.value)
        //send the username to the server
        socket.emit(USER_CONNECTION, 
             e.target.surname.value, 
             this.connectionCallback
        )
    }

    /**
     * Callback function when the login form is submitted
     * @param user: the user send by the server
     */
    connectionCallback = (user) => {

        if(user !== null) {  
            this.props.setUser(user);

        }else {
            this.setState({ userExist: true })
        }
        console.log('User set', this.props.user)
    }

    render() {
        return (
            <div className="login-container">
                <form onSubmit={this.handleSubmit} className="login-form">
                    <label htmlFor="nameInput"> Choose a name </label>
                    <input type="text" name="surname" placeholder="What's your surname ?" id="nameInput" />
                    <button type="submit"> Enter </button>
                    <div className="error"> { this.state.userExist ? 'User is taken': null} </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        socket: state.socket
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setUser: setUser
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);