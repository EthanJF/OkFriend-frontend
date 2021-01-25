import React, { Component } from 'react'
import Friends from './Friends'
import Chat from './Chat'
import uuid from 'react-uuid'


export default class FriendsChatPanel extends Component {

    state = {
        showTopButton: false
    }

    scrollToTop = () => {
        this.topScrollDiv.scrollIntoView({ behavior: 'smooth' })
    }

    scrollToBottom = () => {
        this.bottomScrollDiv.scrollIntoView({ behavior: 'smooth'})
    }

    handleChatDivClick = (chat) => {
        this.props.startChatFromLI(chat)
        this.scrollToBottom()
    }

    checkScrollPosition = (event) => {
        const chatPanel = event.target
        if (chatPanel.scrollTop !== 0){
            this.setState({
                showTopButton: true
            })
        } else {
            this.setState({
                showTopButton: false
            })
        }
    }

    render(){
        const renderChats = this.props.allChats.map((chat) => {
            return <div key={uuid()} onClick={() => this.handleChatDivClick(chat)}><li>{chat.user1.username===this.props.username ? chat.user2.username : chat.user1.username}  <button onClick={() => this.props.deleteAChat(chat.id)}>Delete</button></li></div>
        })
        return(
            <div className="friends-chat-panel"  onScroll={this.checkScrollPosition}>
                <div ref={topScrollDiv => { this.topScrollDiv = topScrollDiv; }} />
                <Friends friends={this.props.friends} userID={this.props.userID} setID={this.props.setID}/>
                <h1>My Chats</h1>
                <ul className="chat-list">
                 {renderChats.length !== 0 ? renderChats : "You don't have any chats!"}
                </ul>
                <Chat scrollToBottom={this.scrollToBottom} username={this.props.username} selectedUserID={this.props.selectedUserID} userID={this.props.userID} allChats={this.props.allChats} addAChat={this.addAChat} thisChat={this.props.thisChat} thisChatMessages={this.props.thisChatMessages} onChatSubmit={this.props.onChatSubmit} message={this.props.message} onMessageChange={this.props.onMessageChange}/>
                { this.state.showTopButton ? <button id="scroll-button" title="Go to top" onClick={this.scrollToTop}>Top</button> : ""}
                <br/>
                <br/>
                <br/>
                <div ref={bottomScrollDiv => { this.bottomScrollDiv = bottomScrollDiv; }} />
            </div>
        )
    }
}