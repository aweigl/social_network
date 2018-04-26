import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import { Logo } from "./logo";
import axios from "../axios";

export function Profilepic(props) {
    console.log(props);
    if (!props.userData.profilepic) {
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
            <img id="profilePic" src={props.userData.profilepic} />
        </div>
    );
}
