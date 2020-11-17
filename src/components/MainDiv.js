import React, { Component } from 'react'
import EditProfile from './EditProfile'
import MyProfile from './MyProfile'
import UserProfile from './UserProfile'
import HomePage from './HomePage'
import Search from './Search'
import CalendarPage from './CalendarPage'
import NavBar from './NavBar'
import FriendsChatPanel from './FriendsChatPanel'
import { Route, Switch } from 'react-router-dom'
import zipcodes from 'zipcodes'

export default class MainDiv extends Component {

    state = {
        allUsers: [],
        username: "",
        zip_code: 0,
        interests: [],
        myFriends: [],
        allChats: [],
        thisChat: {},
        thisChatMessages: [],
        message: "",
        nearbyZipCodes: [],
        randomNumber: 0,
        nearbyUsers: []
    }

    componentDidMount(){
        fetch("http://localhost:3000/users")
        .then(r => r.json())
        .then(resObj1 => {
            fetch(`http://localhost:3000/users/${this.props.userID}`)
                .then(r => r.json())
                .then(resObj2 => {
                    const myUsers = resObj1.filter((user) => {
                        return user.id !== this.props.userID
                    })
                    const rad = zipcodes.radius(resObj2.zip_code, 5)
                    const nearbyUsers = myUsers.filter((user) => {
                        return rad.includes(user.zip_code)
                    })
                    let rand = Math.floor(Math.random() * nearbyUsers.length)
                    this.setState({
                        username: resObj2.username,
                        zip_code: resObj2.zip_code,
                        interests: resObj2.interests,
                        myFriends: resObj2.all_friendships,
                        allChats: resObj2.all_chats,
                        thisChat: resObj2.all_chats[0],
                        thisChatMessages: resObj2.all_chats[0] ? resObj2.all_chats.messages : [],
                        allUsers: myUsers,
                        nearbyUsers: nearbyUsers,
                        nearbyZipCodes: rad,
                        randomNumber: rand
                    })
                })
        })
    }

    deleteAUser = () => {
        fetch(`http://localhost:3000/users/${this.props.userID}`,{
            method: "DELETE"
        })
        .then( r => r.json())
        .then(resObj => {
            const newUsers = this.state.allUsers.filter((user) => {
                return user.id !== resObj.id
            })
            this.setState({
                allUsers: newUsers
            }, () => this.props.logOutClick())
        })
    }

    addAFriend = (otherUserID) => {
        if (!this.state.myFriends.find(element => element.user1_id === this.props.selectedUserID || element.user2_id === this.state.selectedUserID)){
            fetch('http://localhost:3000/friendships', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    friendship: {
                        user1_id: this.props.userID,
                        user2_id: otherUserID
                    }

                })
            })
                .then(r => r.json())
                .then(resObj => {
                    this.setState({
                        myFriends: [...this.state.myFriends, resObj]
                    })
                })
        } 
    }

    removeAFriend = (otherUserID) => {
        const friendshipID = this.state.myFriends.find(element => element.user1_id === otherUserID || element.user2_id === otherUserID)
        if(friendshipID){
            fetch(`http://localhost:3000/friendships/${friendshipID.id}`, {
                method: "DELETE"
            })
                .then(r => r.json())
                .then(resObj => {
                    const newFriends = this.state.myFriends.filter((friend) => {
                        return friend.id !== resObj.id
                    })
                    this.setState({
                        myFriends: newFriends
                    })
                })
        } 

    }


    startChatFromLI = (chat) => {
        fetch(`http://localhost:3000/chats/${chat.id}`)
        .then(r => r.json())
        .then(resObj => {
            this.setState({
                thisChatMessages: resObj.messages,
                thisChat: resObj,
                message: ""
            })
        })
    }

    addAChat = (otherUserID) => {
        const myChat = this.state.allChats.find(element => element.user1_id === otherUserID || element.user2_id === otherUserID)
        if (!myChat) {
            fetch("http://localhost:3000/chats", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    chat: {
                        user1_id: this.props.userID,
                        user2_id: otherUserID
                    }
                })
            })
                .then(r => r.json())
                .then(resObj => {
                    this.setState({
                        thisChat: resObj,
                        otherUsername: resObj.user2.username,
                        allChats: [...this.state.allChats, resObj],
                        thisChatMessages: []
                    })
                })
        } else {
            this.setState({
                thisChat: myChat,
                thisChatMessages: myChat.messages,
                otherUsername: myChat.user2.username
        })
    }
}

    deleteAChat = (id) => {
        fetch(`http://localhost:3000/chats/${id}`, {
            method: "DELETE"
        })
            .then(r => r.json())
            .then(resObj => {
                const newChats = this.state.allChats.filter((chat) => {
                    return chat.id !== resObj.id
                })
                const lastChat = newChats[newChats.length - 1]
                this.setState({
                    allChats: newChats,
                    thisChat: lastChat,
                    thisChatmessages: lastChat.messages
                })
            })
    }

    onChatSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:3000/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                message: {
                    user_id: this.props.userID,
                    chat_id: this.state.thisChat.id,
                    content: event.target.message.value
                }
            })
        })
            .then(r => r.json())
            .then(resObj => {
                this.setState({
                    thisChatMessages: [...this.state.thisChatMessages, resObj],
                    message: ""
                })
            })
    }

    onMessageChange = (event) => {
        this.setState({
            message: event.target.value
        })
    }

    renderUserProfile = (renderParams) => {
        const slug = renderParams.match.params.slug
        const user = this.state.allUsers.find(user => user.username === slug)
        if (user) {

            return <UserProfile thisUserID={user.id} deleteAUser={this.deleteAUser} userID={this.props.userID} addAFriend={this.addAFriend} removeAFriend={this.removeAFriend} myFriends={this.state.myFriends} addAChat={this.addAChat} currentUser={user} currentUserInterests={user.interests}/>
            
        }
    }

    render(){
        return(
            <div>
                <NavBar showProfile={this.props.showProfile} handleProfileClick={this.props.handleProfileClick} handleHomeClick={this.props.handleHomeClick} onClick={this.props.logOutClick} username={this.state.username}/>
                <FriendsChatPanel userID={this.props.userID} friends={this.state.myFriends} setID={this.setID} username={this.state.username} showChatPanel={this.state.showChatPanel} selectedUserID={this.state.selectedUserID} startChat={this.startChat} startChatFromLI={this.startChatFromLI} allChats={this.state.allChats} thisChat={this.state.thisChat} deleteAChat={this.deleteAChat} thisChatMessages={this.state.thisChatMessages} onChatSubmit={this.onChatSubmit} message={this.state.message} onMessageChange={this.onMessageChange}/>
                <div className="main-div">
                    <Switch>
                        <Route exact path="/home/my-profile/edit" render={(props) => <EditProfile {...props} userID={this.props.userID} deleteAUser={this.deleteAUser} />} />
                        <Route exact path="/home/my-profile" render={(props) => <MyProfile {...props} selectedUserID={this.state.selectedUserID} resetRedirect={this.resetRedirect} deleteAUser={this.deleteAUser} userID={this.props.userID} interests={this.props.interests} />} />
                        <Route path="/home/user-profile/:slug" render={ this.renderUserProfile } />
                        <Route exact path="/home/search" render={(props) => <Search {...props} interests={this.props.interests} allUsers={this.state.allUsers} setID={this.setID} userID={this.props.userID} />} />
                        <Route exact path="/home/calendar" render={(props) => <CalendarPage {...props} userID={this.props.userID} myFriends={this.state.myFriends} />} />
                        <Route exact path="/home" render={(props) => <HomePage {...props} allUsers={this.state.allUsers} selectedUserID={this.state.selectedUserID} setID={this.setID} zip_code={this.state.zip_code} userID={this.props.userID} interests={this.state.interests} nearbyZipCodes={this.state.nearbyZipCodes} randomNumber={this.state.randomNumber} nearbyUsers={this.state.nearbyUsers}/>} />
                    </Switch>
                </div>
                
            </div>
        )
    }
}