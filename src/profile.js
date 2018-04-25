import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import { Logo } from "./logo";
import axios from "../axios";

export function Profile(props) {
    console.log(props);
    if (!props.userData.profilePic) {
        return (
            <div>
                <img
                    id="profilePic"
                    src="default.png"
                    alt={props.userData.first + " " + props.userData.last}
                />
            </div>
        );
    }
    return (
        <div>
            <img id="profilePic" src={props.userData.profilePic} />
        </div>
    );
}
