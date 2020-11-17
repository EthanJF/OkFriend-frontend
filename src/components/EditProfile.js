import React from 'react'
import { Redirect } from 'react-router-dom'

export default class EditProfile extends React.Component {

    state = {
        username: "",
        email: "",
        password: "",
        age: 0,
        gender: "male",
        zip_code: 0,
        parties: "I don't go to parties",
        picture: "https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg",
        allParties: ["I don't go to parties.", "I'm always looking for a good time.", "I'm the center of attention.",
            "I'm great at making new friends.", "I love to mingle.", "I'm a wallflower.", "I tend to keep to myself.",
            "I prefer one-on-one interactions."],
        about_me: "",
        errors: [],
        submitted: false
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${this.props.userID}`)
        .then( r => r.json() )
        .then( resObj => {
            this.setState({
                username: resObj.username,
                email: resObj.email,
                password: resObj.password,
                age: resObj.age,
                gender: resObj.gender,
                zip_code: resObj.zip_code,
                parties: resObj.parties,
                picture: resObj.picture,
                about_me: resObj.about_me
            })
        })
        
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitClick = event => {
        event.preventDefault()
        fetch(`http://localhost:3000/users/${this.props.userID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    age: this.state.age,
                    gender: this.state.gender,
                    zip_code: this.state.zip_code,
                    parties: this.state.parties,
                    picture: this.state.picture,
                    about_me: this.state.about_me
                }
            })
        })
        .then(r => r.json())
        .then(resp => {
            if(resp.errors){
                this.setState({
                    errors: resp.errors
                })
            } else {
                this.setState({
                    submitted: true
                })
            }
        })
    }

    componentWillUnmount() {
        this.setState({
            username: "",
            password: "",
        })
    }

    render() {

        const partyOptions = this.state.allParties.map((party) => {
            return <option value={party}>{party}</option>
        })
        return (
            <div className="edit">
              {this.state.errors.map(error => <p>{ error }</p>)}

                <h2>Edit Profile</h2>
                <form>
                    <label>Username: </label>
                    <input onChange={this.onChange} name="username" type="text" value={this.state.username} />
                    <br />
                    <label>Email: </label>
                    <input onChange={this.onChange} name="email" type="text" value={this.state.email}/>
                    <br />
                    <label>Password: </label>
                    <input onChange={this.onChange} name="password" type="password"/>
                    <br />
                    <label>Age: </label>
                    <input onChange={this.onChange} name="age" type="number" value={this.state.age} />
                    <br />
                    <label>Gender: </label>
                    <select onChange={this.onChange} name="gender" value={this.state.gender}>
                        <option value="male">male</option>
                        <option value="female">female</option>
                        <option value="non-binary">non-binary</option>
                    </select>
                    <br />
                    <label>Zip Code: </label>
                    <input onChange={this.onChange} name="zip_code" type="number" value={this.state.zip_code} />
                    <br />
                    <label>What are you like at parties?: </label>
                    <select onChange={this.onChange} name="parties" value={this.state.parties}>
                        {partyOptions}
                    </select>
                    <br />
                    <label>Picture: </label>
                    <input onChange={this.onChange} name="picture" type="text" value={this.state.picture}/>
                    <br />
                    <label>About Me: </label>
                    <textarea onChange={this.onChange} name="about_me" value={this.state.about_me} />
                    <br />
                    <button onClick={this.submitClick}>Submit</button>

                </form>
                {this.state.submitted ? <Redirect to="/home/my-profile"/> : ""}
                <br />
                <button onClick={this.props.deleteAUser}>Delete Profile</button>

            </div>
        )
    }

}