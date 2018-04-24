import React from "react";
import axios from "../axios";
import { Register } from "./register.js";
import { Logo } from "./logo.js";
import { Login } from "./login.js";
import { HashRouter, Route } from "react-router-dom";

export function Welcome() {
    return (
        <div className="welcome" style={welcomeStyle}>
            <h1>THIS IS WHERE MY SOCIAL NETWORK IS GROWING</h1>
            <img src="/logo.png" style={imgStyle} />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Register} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}

export const imgStyle = {
    justifySelf: "center"
};

const welcomeStyle = {
    display: "grid",
    gridTemplateRows: "repeat(3, auto)",
    justifyContent: "center"
};
