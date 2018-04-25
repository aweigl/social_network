import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import { Logo } from "./logo.js";
import axios from "../axios";
import { Profile } from "./profile.js";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.render = this.render.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
        axios
            .get("/user")
            .then(response => {
                if (response.data.success) {
                    this.setState({ userData: response.data.userData });
                }
            })
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        return (
            <div>
                <Logo />
                {this.state.userData && <Profile {...this.state} />}
            </div>
        );
    }
}
