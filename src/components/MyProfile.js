import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class MyProfile extends Component {
    state = {
        currentUser: {},
        currentUserInterests: [],
        newInterest: "hiking"
    }

    componentDidMount() {
        fetch(`http://localhost:3000/users/${this.props.userID}`)
            .then(r => r.json())
            .then(resObj => {
                if(this.props.userID){
                    this.setState({
                        currentUser: resObj,
                        currentUserInterests: resObj.interests
                    })
                }
            })
    }

    changeInterest = (event) => {
        this.setState({
            newInterest: event.target.value
        })
    }

    deleteInterest = (event) => {
        event.preventDefault()
        fetch(`http://localhost:3000/interests/${event.target.dataset.id}`, {
            method: "DELETE"
        })
        .then (r => r.json())
        .then(resObj => {
            const newInterests = this.state.currentUserInterests.filter((interest) => {
                return interest.id !== resObj.id
            })
            this.setState({
                currentUserInterests: newInterests
            })
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(!this.state.currentUserInterests.find(element => element.name === this.state.newInterest)){
            fetch("http://localhost:3000/interests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: this.state.newInterest,
                    user_id: this.props.userID
                })
            })
                .then(r => r.json())
                .then(resObj => {
                    this.setState({
                        currentUserInterests: [...this.state.currentUserInterests, resObj]
                    })
                })
        } else {
            alert("You've already added this interest!")
        }
       
    }

    render() {
        const user = this.state.currentUser
    
        const interestOptions = this.props.interests.map((interest) => {
            return <option name={interest}>{interest}</option>
        })

        const userInterests = this.state.currentUserInterests.map((interest) => {
            return <div>
                <li key={interest.id}>{interest.name}  <button onClick={this.deleteInterest} data-id={interest.id} name={interest.name}>Delete</button></li>
            </div>
        })
        return (
            <div className="user-profile">
                <h1>{user.username}</h1>
                <div className="image-div">
                    <img alt="profile" src={user.picture} />
                </div>
                <div className="detail-div">
                    <h3>Location: New York City</h3>
                    <h3>Age: {user.age}</h3>
                    <h3>Gender: {user.gender}</h3>
                </div>
                <div className="party-div">
                    <h2>What are you like at parties?</h2>
                    <p>{user.parties}</p>
                </div>
                <div className="interest-div">
                    <h2>My Interests</h2>
                    <ul>
                        {userInterests}

                    </ul>
                    <h2>Add an Interest:</h2>
                    <form>
                        <select name="newInterest" onChange={this.changeInterest} value={this.state.newInterest}>
                            {interestOptions}
                        </select>
                        <br />
                        <input type="submit" onClick={this.handleSubmit}/>
                    </form>
                </div>
                <div className="about-me">
                    <h2>About Me</h2>
                    {user.about_me}
                </div>
                <br />
                <br />
                <div className="edit-delete-div">
                    <NavLink exact to="/home/my-profile/edit">Edit Profile</NavLink>
                </div>
            </div>
        )
    }
}