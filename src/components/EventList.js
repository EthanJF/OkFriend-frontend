import React, { Component } from 'react'
import uuid from 'react-uuid'

export default class EventList extends Component {
    render(){
        const eventList = this.props.allEvents.map((event) => {
            const otherFriend = event.user1.id === this.props.userID ? event.user2 : event.user1
            const readableDate = new Date(event.time).toString().slice(0, 15)
            return <li key={uuid()} onClick={()=>this.props.showEventDetail(event.id)}>{event.name} with {otherFriend ? otherFriend.username : ""} on {readableDate} <button onClick={() => this.props.deleteEvent(event.id)}>Delete</button></li>
        })
        return(
            <div className="event-list">
                <h1>My Upcoming Events</h1>
                <h3>Click to See More Detail</h3>
                <ul>
                    {eventList}
                </ul>
            </div>
        )
    }
}