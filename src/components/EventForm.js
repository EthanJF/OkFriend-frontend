import React, { Component } from 'react'

export default class EventForm extends Component {

    state = {
        name: "",
        description: "",
        time: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0],
        otherUser: null,
        errors: []
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:3000/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                event: {
                    user1_id: this.props.userID,
                    user2_id: this.state.otherUser,
                    name: this.state.name,
                    description: this.state.description,
                    time: this.state.time
                }
            })
        })
        .then(r => r.json())
        .then(resObj => {
            if (resObj.errors) {
                this.setState({
                    errors: resObj.errors
                })
            } else {
                this.props.addEvent(resObj)
                this.setState({
                    name: "",
                    description: "",
                    time: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]
                })
            }
        })
    }

    render() {
        const myFriends = this.props.myFriends.map((friend) => {
            const otherFriend= friend.user1.id===this.props.userID ? friend.user2 : friend.user1
            return <option name="otherUser" value={otherFriend.id} key={otherFriend.id}>{otherFriend.username}</option>
        })
        return (
            <div className="event-form">
                {this.state.errors.map(error => <p>{error}</p>)}
                <h1>Create a New Event</h1>
                <form onSubmit={this.onSubmit}>
                    <label>Name: </label>
                    <input type="text" name="name" value={this.state.name} onChange={this.onChange}/>
                    <br />
                    <label>Description: </label>
                    <input type="text" name="description" value={this.state.description} onChange={this.onChange}/>
                    <br />
                    <label>Time: </label>
                    <input type="datetime-local" name="time" value={this.state.time} onChange={this.onChange}/>
                    <br />
                    <label>Other Participant: </label>
                    <select name="otherUser" value={this.state.otherUser} onChange={this.onChange}>
                        <option name="otherUser" value="null">Select...</option>
                        {myFriends}
                    </select>
                    <br />
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}