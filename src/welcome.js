import React from "react";
import axios from "../axios";
import { Register } from "./register";
import { Logo } from "./logo";
import { Login } from "./login";
import { HashRouter, Route } from "react-router-dom";

export function Welcome() {
    return (
        <div>
            <div className="input">
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Register} />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>
            </div>
            <div className="welcome">
                <h1 id="header">ArticleSwap</h1>
                <img id="logo" src="/logo.png" />
                <h3 id="slogan">
                    A place to discuss and swap scientific articles!
                </h3>
            </div>
        </div>
    );
}
