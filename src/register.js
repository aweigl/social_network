import React from "react";
import axios from "../axios";
import { Logo } from "./logo";
import { Link } from "react-router-dom";

export class Register extends React.Component {
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
        let userInfo = {
            first: this.first,
            last: this.last,
            mail: this.mail,
            password: this.password
        };
        console.log(userInfo);
        axios.post("/register", userInfo).then(response => {
            if (response.data.success && response.data.logged) {
                console.log(response.data.logged);
                location.replace("/");
            } else {
                this.setState({
                    error: true
                });
            }
        });
    }
    render() {
        return (
            <div>
                <div className="register">
                    {this.state.error && (
                        <div className="postError">
                            Something went wrong, please try again
                        </div>
                    )}

                    <input
                        placeholder="First name"
                        name="first"
                        onChange={this.inputChange}
                    />

                    <input
                        placeholder="Last name"
                        name="last"
                        onChange={this.inputChange}
                    />

                    <input
                        placeholder="E-mail"
                        name="mail"
                        onChange={this.inputChange}
                    />

                    <input
                        placeholder="Password"
                        name="password"
                        onChange={this.inputChange}
                    />

                    <button onClick={this.submit}>Register</button>
                    <div id="loginMember">
                        <Link to="/login">
                            <button>Log in!</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
