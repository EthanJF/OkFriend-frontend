import React, { Component } from 'react'
import UserCard from './UserCard'
import uuid from 'react-uuid'

export default class SearchUsers extends Component {
    render(){
        const allUsers = this.props.allUsers.map((user) => {
            return <UserCard user={user} key={uuid()} setID={this.props.setID} />
        })
        return(
                <div className="search-users">
                    {allUsers}
                </div>
        )
    }
}