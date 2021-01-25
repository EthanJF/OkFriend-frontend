import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import uuid from 'react-uuid'

export default class Friends extends Component {
    
    render(){
        const friends = this.props.friends.map((friend) => {
            if(friend.user2.id !== this.props.userID) {
                return <NavLink key={uuid()} className="nav-link" exact to={`/home/user-profile/${friend.user2.username}`}><li key={uuid()}>{friend.user2.username}</li></NavLink>
            } else {
                return <NavLink key={uuid()} className="nav-link" exact to={`/home/user-profile/${friend.user1.username}`}><li key={uuid()}>{friend.user1.username}</li></NavLink>
            }
        })
        return(
            <div className="friends">
                <h1>My Friends</h1>
                <ul className="friends-list">
                    {friends.length !== 0 ? friends : "You don't have any friends!"}
                </ul>
            </div>
        )
    }
}