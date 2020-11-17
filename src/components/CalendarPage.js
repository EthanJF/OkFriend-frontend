import React, { Component } from 'react'
import EventList from './EventList'
import EventDetail from './EventDetail'
import EventForm from './EventForm'

export default class CalendarPage extends Component {

    state = {
        allEvents: [],
        thisEvent: {}
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${this.props.userID}`)
        .then(r=> r.json())
        .then(resObj => {
            this.setState({
                allEvents: resObj.all_events,
                thisEvent: resObj.all_events[0]
            })
        })
    }

    addEvent = (eventObj) => {
        this.setState({
            allEvents: [...this.state.allEvents, eventObj]
        })
    }

    showEventDetail = (eventID) => {
        fetch(`http://localhost:3000/events/${eventID}`)
        .then(r => r.json())
        .then(resObj => {
            this.setState({
                thisEvent: resObj
            })
        })
    }

    deleteEvent = (eventID) => {
        fetch(`http://localhost:3000/events/${eventID}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(resObj => {
            const newEvents = this.state.allEvents.filter((event) => {
                return event.id !== resObj.id
            })
            this.setState({
                allEvents: newEvents,
                thisEvent: newEvents[newEvents.length - 1]
            })
        })
    }

    render(){
        return(
            <div className="calendar-page">
                <EventList allEvents={this.state.allEvents} userID={this.props.userID} showEventDetail={this.showEventDetail} deleteEvent={this.deleteEvent}/>
                 <EventDetail selectedEventID={this.state.selectedEventID} userID={this.props.userID} allEvents={this.state.allEvents} thisEvent={this.state.thisEvent}/>
                <EventForm userID={this.props.userID} myFriends={this.props.myFriends} addEvent={this.addEvent}/>
            </div>
        )
    }
}