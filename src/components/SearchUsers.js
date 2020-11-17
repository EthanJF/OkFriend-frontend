import React, { Component } from 'react'
import UserCard from './UserCard'

export default class SearchUsers extends Component {
    render(){
        const allUsers = this.props.allUsers.map((user) => {
            return <UserCard user={user} key={user.id} setID={this.props.setID} />
        })
        return(
                <div className="search-users">
                {allUsers}

                </div>
        )
    }
}