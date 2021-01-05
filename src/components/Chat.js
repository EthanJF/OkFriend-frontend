import React, { Component } from 'react'

export default class Chat extends Component {
    render() {
        const thisChat = this.props.thisChat
        const theseMessages = this.props.thisChatMessages
        let otherUsername
        if (thisChat) {
            if (thisChat.user1) {
                otherUsername = thisChat.user1.id === this.props.userID ? this.props.thisChat.user2.username : this.props.thisChat.user1.username
            }
        }

        let messages = null
        if (theseMessages) {
            messages = theseMessages.map((message) => {
                if (message.user.username === this.props.username) {
                    // return <li className="my-message">{message.user.username} said: {message.content}</li>
                    return <li className="my-message">{message.content}</li>
                }
                else {
                    // return <li className="other-message">{message.user.username} said: {message.content}</li>
                    return <li className="other-message">{message.content}</li>
                }
            })
        }

        return (
            <div className="chat">
                {otherUsername !== undefined ? (<div>
                    <ul className="scrollable-chat">
                        {messages ? messages : ""}
                    </ul>
                    <form onSubmit={(event) => this.props.onChatSubmit(event)}>
                        <input name="message" type="text" onChange={this.props.onMessageChange} value={this.props.message} />
                        <input type="submit" />
                    </form><h3>Chatting with {otherUsername}</h3></div>) : "You need to start a chat first!"}
            </div>
        )
    }
}