import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


export default class UserCard extends Component {
    render(){
        return(
            <NavLink exact to={`/home/user-profile/${this.props.user.username}`}>
            <div>
                <img alt="profile" src={this.props.user.picture}/>
                <h3>{this.props.user.username}</h3>
            </div>
            </NavLink>
        )
    }
}