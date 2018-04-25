import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import { Logo } from "./logo.js";
import axios from "../axios";

export function Profile(props) {
    console.log(props.userData.profilePic);
    if (!props.userData.profilePic) {
        return (
            <div>
                <img src="/default.png" />
            </div>
        );
    }
    return (
        <div>
            <img src={props.userData.profilePic} />
        </div>
    );
}
