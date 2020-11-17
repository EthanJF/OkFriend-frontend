import React, { Component } from 'react'
import AreaUsers from './AreaUsers'
import InterestUsers from './InterestUsers'

export default class HomePage extends Component {

    state = {
        randomInterest: ""
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${this.props.userID}`)
        .then( r => r.json())
        .then( resObj => {
            if(resObj.interests.length !== 0){
                const rand = Math.floor((Math.random() * resObj.interests.length))
                this.setState({
                    randomInterest: resObj.interests[rand]["name"]
                })
            }
            
        })
    }

    render(){
        return(
            <div className="homepage">
                <h1>Recommended Friends In Your Area</h1>
                <br />
                <AreaUsers allUsers={this.props.allUsers} setID={this.props.setID} zip_code={this.props.zip_code} userID={this.props.userID} nearbyZipCodes={this.props.nearbyZipCodes} randomNumber={this.props.randomNumber} nearbyUsers={this.props.nearbyUsers}/>
                {this.state.randomInterest ? (<h1>Recommended Friends Who Enjoy {this.state.randomInterest}</h1>) : (<div><h1>You don't have any interests!</h1><p>Go to your profile to add some interests</p></div>)}
                <br />
                <InterestUsers allUsers={this.props.allUsers} setID={this.props.setID} zip_code={this.props.zip_code} userID={this.props.userID} randomInterest={this.state.randomInterest}/>
            </div>
        )
    }
}