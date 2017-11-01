import React, { Component } from 'react'
import { USER_CONNECTION } from '../Events'

class Login extends Component {


    /**
     * when the form is submitted
     */
    handleSubmit = (e) => {
        e.preventDefault(); //stop the submission

        const { socket,connectionCallback } = this.props //get the socket from app
        console.log('Connect user', e.target.surname.value)
        //send the username to the server
        socket.emit(USER_CONNECTION, 
             e.target.surname.value, 
             connectionCallback
        )
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="nameInput"> Choose a name </label>
                    <input type="text" name="surname" placeholder="What's your surname ?" id="nameInput" />
                    <button type="submit"> Enter </button>
                </form>
            </div>
        );
    }
}

export default Login;