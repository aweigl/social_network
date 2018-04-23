import React from "react";
import axios from "axios";
import bcrypt from "bcryptjs";

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.inputChange = this.inputChange.bind(this);
        this.submit = this.submit.bind(this);
        this.hashPassword = this.hashPassword.bind(this);
    }
    inputChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit() {
        this.hashPassword(this.password)
            .then(result => {
                this.password = result;
                let userInfo = {
                    name: this.first,
                    last: this.last,
                    mail: this.mail,
                    password: this.password
                };
                console.log(userInfo);
                axios.post("/register", userInfo).then(response => {
                    if (response.data.success) {
                        location.replace("/");
                    } else {
                        this.setState({
                            error: true
                        });
                    }
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    hashPassword(plainTextPassword) {
        return new Promise(function(resolve, reject) {
            bcrypt.genSalt(function(err, salt) {
                if (err) {
                    return reject(err);
                }
                bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(hash);
                });
            });
        });
    }
    render() {
        return (
            <div>
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
                <button onClick={this.submit}>Submit</button>
            </div>
        );
    }
}
