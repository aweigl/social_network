import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import { Logo } from "./logo";
import axios from "../axios";

export function Upload(props) {
    return (
        <div id="uploadPic">
            <input id="file" type="file" name="file" onChange={props.setFile} />
            <button onClick={props.uploadProfilePic}>Submit</button>
        </div>
    );
}
