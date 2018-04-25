import React from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.inputChange = this.inputChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    inputChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit() {
        console.log(this.state);
        let userInfo = {
            mail: this.mail,
            password: this.password
        };
        axios
            .post("/login", userInfo)
            .then(response => {
                if (response.data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        return (
            <div className="register" id="login">
                <div id="loginMail">
                    <input
                        placeholder="E-mail"
                        name="mail"
                        onChange={this.inputChange}
                    />
                </div>
                <div id="loginPassword">
                    <input
                        placeholder="Password"
                        name="password"
                        onChange={this.inputChange}
                    />
                </div>
                <button onClick={this.submit}>Login</button>
                <div id="registerButton">
                    <Link to="/">
                        <button>Register</button>
                    </Link>
                </div>
                {this.state.error && (
                    <div className="loginError">
                        Something went wrong, please try again
                    </div>
                )}
            </div>
        );
    }
}
