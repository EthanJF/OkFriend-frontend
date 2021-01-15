import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class NavBar extends Component {
    render(){
        return(
            <div className="navbar">
                <h1 className="logo"><span>Ok</span>Friend</h1>
                <h2>Welcome, <span>{this.props.username}</span></h2>
                <NavLink className="nav-link" exact to="/home">Home</NavLink>
                <NavLink className="nav-link" exact to="/home/search">Search</NavLink>
                <NavLink className="nav-link" exact to="/home/my-profile">Profile</NavLink>
                <NavLink className="nav-link" exact to="/home/calendar">Calendar</NavLink>
                <NavLink className="nav-link" onClick={this.props.onClick} exact to='/welcome'>Logout</NavLink>
            </div>
            
        )
    }
}