import React from 'react'
import { Redirect } from 'react-router-dom'
import uuid from 'react-uuid'

class Signup extends React.Component {

    state = {
        username: "",
        email: "",
        password: "",
        age: "",
        gender: "male",
        zip_code: "",
        parties: "I don't go to parties",
        picture: "https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg",
        allParties: ["I don't go to parties.", "I'm always looking for a good time.", "I'm the center of attention.",
            "I'm great at making new friends.", "I love to mingle.", "I'm a wallflower.", "I tend to keep to myself.",
            "I prefer one-on-one interactions."],
        about_me: "Write something nice about yourself!",
        errors: []
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitClick = event => {
        event.preventDefault()
        this.setState({
            errors: []
        })
        fetch(`${process.env.REACT_APP_ROOT_URL}/users`, {
            method: "POST",
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
                if (resp.errors) {
                    this.setState({
                        errors: resp.errors
                    })
                } else {
                    fetch(`${process.env.REACT_APP_ROOT_URL}/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: this.state.username,
                            password: this.state.password
                        })
                    })
                        .then(r => r.json())
                        .then(resp => {
                            if (resp.errors) {
                                this.setState({
                                    errors: resp.errors,
                                    username: "",
                                    password: ""
                                })
                            } else {
                                this.props.setToken(resp)
                            }
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
            return <option key={uuid()} value={party}>{party}</option>
        })

        const errors = this.state.errors.map(error => <li key={uuid()}>{error}</li>) 
        return (
            <div className="login">
                <ul className="errors">
                {errors}

                </ul>

                <h2>Signup</h2>
                <form>
                    <label>Username: </label>
                    <input onChange={this.onChange} name="username" type="text" value={this.state.username}/>
                    <br />
                    <label>Email: </label>
                    <input onChange={this.onChange} name="email" type="text" value={this.state.email}/>
                    <br />
                    <label>Password: </label>
                    <input onChange={this.onChange} name="password" type="password" value={this.state.password} />
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
                    <input onChange={this.onChange} name="zip_code" type="number" value={this.state.zip_code}/>
                    <br />
                    <label>What are you like at parties?: </label>
                    <select onChange={this.onChange} value={this.state.parties} name="parties">
                        {partyOptions}
                    </select>
                    <br />
                    <button onClick={this.submitClick}>Submit</button>

                </form>
                { this.props.token ? <Redirect to="/home"/> : <Redirect to="/welcome" />}

            </div>
        )
    }

}

export default Signup