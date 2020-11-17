import React, { Component } from 'react'
import UserCard from './UserCard'

export default class AreaUsers extends Component {

    render(){
    
        let rand = this.props.randomNumber
        const allUsers = this.props.nearbyUsers.slice(rand,(rand + 12)).map((user) => {
            return <UserCard user={user} key={user.id} setID={this.props.setID}/>
        })
        return(
            <div className="area-users">
                {allUsers}
            </div>
        )
    }
}