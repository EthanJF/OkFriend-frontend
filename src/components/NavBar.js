import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import withSizes from 'react-sizes'


class NavBar extends Component {

    state = {
        menuOpen: false
      }

      handleStateChange () {
        this.setState({menuOpen: this.state.isOpen})  
      }
      
      closeMenu () {
        this.setState({menuOpen: false})
      }
    
      toggleMenu () {
        this.setState({menuOpen: !this.state.menuOpen})
      }

    render(){
        if(this.props.isTablet){
            return(
                <div className="navbar">
                    <h1 className="logo"><span>Ok</span>Friend</h1>
                    <h2>Welcome, <br/><span id="username-span">{this.props.username}</span></h2>
                    <Menu right isOpen={this.state.menuOpen} 
                    onStateChange={(state) => this.handleStateChange(state)}>
                        <NavLink className="nav-link menu-item" exact to="/home">Home</NavLink>
                        <NavLink className="nav-link menu-item" exact to="/home/search">Search</NavLink>
                        <NavLink className="nav-link menu-item" exact to="/home/my-profile">Profile</NavLink>
                        <NavLink className="nav-link menu-item" exact to="/home/calendar">Calendar</NavLink>
                        {/* <NavLink className="nav-link menu-item" exact to="/home/chat">Chat</NavLink> */}
                        <NavLink className="nav-link menu-item" onClick={this.props.onClick} exact to='/welcome'>Logout</NavLink>
                    </Menu>
                </div>            
            )
        } else {
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
}

const mapSizesToProps = ({ width }) => ({
  isTablet: width >= 480 && width < 1024
})

export default withSizes(mapSizesToProps)(NavBar)
  