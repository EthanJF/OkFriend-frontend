import React, { Component } from 'react'
import Friends from './Friends'
import Chat from './Chat'
import ReactDOM from 'react-dom'

export default class FriendsChatPanel extends Component {

    state = {
        topButtonDisplay: "none"
    }

    componentDidUpdate() {
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight   
        }
    }

    scrollToTop = () => {
        const node = ReactDOM.findDOMNode(this)
        node.scrollTop = 0
    }

    scrollFunction = (event) => {
        const node = event.target
        if (node.scrollTop > 30) {
            this.setState ({
                topButtonDisplay: "block"
            })
        } else {
            this.setState ({
                topButtonDisplay: "none"
            })
        }
    }



    render(){
        const renderChats = this.props.allChats.map((chat) => {
            return <div onClick={() => this.props.startChatFromLI(chat)}><li>{chat.user1.username===this.props.username ? chat.user2.username : chat.user1.username}  <button onClick={() => this.props.deleteAChat(chat.id)}>Delete</button></li></div>
        })
        return(
            <div className="friends-chat-panel" ref="friendsChatPanel" onScroll={this.scrollFunction}>
                <Friends friends={this.props.friends} userID={this.props.userID} setID={this.props.setID}/>
                <h1>My Chats</h1>
                <ul className="chat-list">
                 {renderChats.length !== 0 ? renderChats : "You don't have any chats!"}
                </ul>
                <Chat username={this.props.username} selectedUserID={this.props.selectedUserID} userID={this.props.userID} allChats={this.props.allChats} addAChat={this.addAChat} thisChat={this.props.thisChat} thisChatMessages={this.props.thisChatMessages} onChatSubmit={this.props.onChatSubmit} message={this.props.message} onMessageChange={this.props.onMessageChange}/>
                <button id="scroll-button" title="Go to top" style={{display: this.state.topButtonDisplay}} onClick={this.scrollToTop}>Top</button>
            </div>
        )
    }
}