import React, { Component } from 'react'
import UserCard from './UserCard'
import uuid from 'react-uuid'

export default class AreaUsers extends Component {

    render(){
    
        let rand = this.props.randomNumber
        const allUsers = this.props.nearbyUsers.slice(rand,(rand + 6)).map((user) => {
            return <UserCard user={user} key={uuid()} setID={this.props.setID}/>
        })
        return(
            <div className="area-users">
                {allUsers}
            </div>
        )
    }
}