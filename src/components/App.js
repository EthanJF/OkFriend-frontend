import React, { Component } from 'react';
import MainDiv from './MainDiv'
import Welcome from './Welcome'
import { Route, Switch, Redirect } from 'react-router-dom'



export default class App extends Component {

  state = {
    showProfile: false,
    showWelcome: true,
    token: localStorage.token,
    loggedInUserId: parseInt(localStorage.userId),
    interests: ["hiking", "reading", "video games", "writing", "coding", "sports", "weight lifting", "crafting",
      "movies", "tv shows", "podcasts", "fitness", "politics", "biking", "skating", "cooking", "drinking",
      "ping pong", "computers", "fashion", "music", "food", "running", "veganism", "vegetarianism",
      "pets", "dogs", "cats", "books", "football", "baseball", "soccer", "beer", "knitting", "crocheting",
      "nature", "tattoos", "piercings", "guitar", "violin", "bass", "drums", "fishing", "kayaking", "boating",
      "science fiction", "fantasy", "literature", "singing", "karaoke", "baking", "board games", "dungeons and dragons",
      "magic the gathering", "activism", "social justice", "clubbing", "bars", "beach", "swimming", "acting"]
  }


  setToken = event => {
    localStorage.token = event.token
    localStorage.userId = event.user_id

    this.setState({
      token: event.token,
      loggedInUserId: event.user_id
    })
  }

  handleProfileClick = () => {
    this.setState({
      showProfile: true
    })
  }

  handleHomeClick = () => {
    this.setState({
      showProfile: false
    })
  }

  showMainDiv = () => {
    this.setState({
      showWelcome: false
    })
  }

  logOutClick = () => {
    localStorage.clear()

    this.setState({
      loggedInUserId: null,
      token: null
    })
  }

  render(){
    return (
      <div>
        <Switch>
          <Route path="/welcome" render={(props) => <Welcome {...props} setToken={this.setToken} showMainDiv={this.showMainDiv} token={this.state.token}/>}/>
          <Route path="/home" render={(props) => <MainDiv {...props} showProfile={this.state.showProfile} handleProfileClick={this.handleProfileClick} handleHomeClick={this.handleHomeClick} interests={this.state.interests} userID={this.state.loggedInUserId} logOutClick={this.logOutClick}/>}/>
          <Route exact path='/' render = { () => <Redirect to="/welcome" /> } />
        </Switch>

      {this.state.token ? "" : <Redirect to="/welcome" />}

      </div>
    )
  }
}
