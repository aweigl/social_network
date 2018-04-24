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
            <div className="register" style={registerStyle}>
                {this.state.error && (
                    <div className="postError">
                        Something went wrong, please try again
                    </div>
                )}
                <div>
                    <label htmlFor="first">First Name</label>
                    <input name="first" onChange={this.inputChange} />
                </div>
                <div>
                    <label htmlFor="last">Last Name</label>
                    <input name="last" onChange={this.inputChange} />
                </div>
                <div>
                    <label htmlFor="mail">E-mail</label>
                    <input name="mail" onChange={this.inputChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input name="password" onChange={this.inputChange} />
                </div>
                <button onClick={this.submit}>Register</button>
                <div>
                    If you are already member, please
                    <Link to="/login"> log in!</Link>
                </div>
            </div>
        );
    }
}

const registerStyle = {
    justifySelf: "center"
};

const inputStyle = {
    float: "right"
};
