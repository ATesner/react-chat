import React, { Component } from 'react';

class Messages extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            
        }
    }
    
   /* componentWillReceiveProps(nextProps) {
        console.log('newProps', nextProps)
        this.setState({ messages: nextProps.messages }); 
        console.log('NEWSTATE', this.state.messages) 
    }*/

    render() {
        const { messages } = this.props
        console.log('NEWRENDER', messages)
        return (
            <div>
                {
                    messages.map((message, index) => {
                        return (
                            <p key={index}>
                            { message }
                            </p>
                        )

                    })
                }
            </div>
        );
    }
}

export default Messages;