import React, { Component } from 'react'

export default class UserProfile extends Component {

    render() {
        const user = this.props.currentUser
        const userInterests = this.props.currentUserInterests

        const interests = userInterests.map((interest) => {
            return <li key={interest.id}>{interest.name}</li>
        })

        const currentFriend = this.props.myFriends.find(element => element.user1_id === this.props.thisUserID || element.user2_id === this.props.thisUserID)
        return (
            <div className="user-profile">
                <div className="left-profile-div">
                    <h2>{user.username}</h2>
                    <div className="image-div">
                        <img alt="profile" src={user.picture} />
                    </div>
                    <div className="detail-div">
                        <ul>
                        <li><span>Location:</span> New York City</li>
                            <li><span>Age:</span> {user.age}</li>
                            <li><span>Gender:</span> {user.gender}</li>  
                        </ul>
                    </div>
                    <br/>
                    <div className="friend-chat-div">
                        {currentFriend ? (<button onClick={() => this.props.removeAFriend(this.props.currentUser.id)}>Remove Friend</button>) : (<button onClick={() => this.props.addAFriend(this.props.currentUser.id)}>Add Friend</button>)}
                        <button onClick={() => this.props.addAChat(this.props.currentUser.id)}>Send Message</button>
                    </div>
                </div>
              <div className="right-profile-div">
              <div className="about-me">
                        <h2>About Me</h2>
                        {user.about_me}
                    </div>
                    <div className="interest-div">
                        <h2>My Interests</h2>
                        <ul>
                            {interests}
                        </ul>
                    </div>
                <div className="party-div">
                        <h2>What are you like at parties?</h2>
                        <p>{user.parties}</p>
                    </div>
             
               
              </div>
            </div>
        )
    }
}