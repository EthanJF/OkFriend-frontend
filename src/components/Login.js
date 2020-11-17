import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {

    state = {
        username: "",
        password: "",
        errors: []
    }


    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitClick = event => {
        event.preventDefault()
        fetch("http://localhost:3000/login", {
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

    componentWillUnmount() {
        this.setState({
            username: "",
            password: ""
        })
    }

    render() {
        return (
            <div className="login">

                {this.state.errors.map(error => <p>{error}</p>)}

                <h2>Login</h2>
                <form>
                    <label>Username: </label>
                    <input onChange={this.onChange} name="username" type="text" />
                    <br />
                    <label>Password: </label>
                    <input onChange={this.onChange} name="password" type="password" />
                    <br />
                    <button onClick={this.submitClick}>Submit</button>
                </form>
                { this.props.token ? <Redirect to="/home"/> : <Redirect to="/welcome" />}
            </div>

        )
    }
}