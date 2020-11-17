import React, { Component } from 'react'

export default class EventDetail extends Component {



    render() {
        const thisEvent = this.props.thisEvent
        let otherFriend
        let dateTime
        let readableDate
        let time
        if(thisEvent){
            otherFriend = thisEvent.user1_id === this.props.userID ? thisEvent.user2 : thisEvent.user1
            dateTime = new Date(thisEvent.time).toString()
            readableDate = dateTime.slice(0, 15)
            time = new Date(thisEvent.time).toLocaleTimeString('en',
                { timeStyle: 'short', hour12: true, timeZone: 'UTC' });
        }
       
        return (
           
            <div className="event-detail">
                <h1>More About Your Event</h1>
                {thisEvent !== undefined ? 
                 (<div>
                 <h3>Name: {thisEvent.name}</h3>
                 <h3>Description: {thisEvent.description}</h3>
                 <h3>Date: {readableDate}</h3>
                 <h3>Time: {time}</h3>
                 <h3>Other Participant: {otherFriend ? otherFriend.username : ""}</h3>
                 </div>) : "You don't have any events!"}
            </div>
        )
    }
}