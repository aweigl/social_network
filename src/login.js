import React from "react";
import axios from "../axios";

const registerStyle = {
    justifySelf: "center"
};

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
                if (response.success) {
                    console.log("user true");
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
            <div className="register" style={registerStyle}>
                {this.state.error && (
                    <div className="loginError">
                        Something went wrong, please try again
                    </div>
                )}
                <div>
                    <label htmlFor="mail">E-mail</label>
                    <input name="mail" onChange={this.inputChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input name="password" onChange={this.inputChange} />
                </div>
                <button onClick={this.submit}>Login</button>
            </div>
        );
    }
}
