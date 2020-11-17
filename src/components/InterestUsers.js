import React, { Component } from 'react'
import UserCard from './UserCard'

export default class InterestUsers extends Component {
    render() {
        const interestUsers = this.props.allUsers.filter((user) => {
            for(var i = 0; i < user.interests.length; i++){
                return user.interests[i]["name"] === this.props.randomInterest
            }
        })
        const allUsers = interestUsers.slice(0,12).map((user) => {
            return <UserCard user={user} key={user.id} setID={this.props.setID}/>
        })
        return (
            <div className="interest-users">
                {allUsers}
            </div>
        )
    }
}