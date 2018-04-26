import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import { Logo } from "./logo";
import axios from "../axios";

export function Upload(props) {
    console.log("PROPS", props);
    return (
        <div id="uploadPic">
            <h2>Hello, {props.userData.first}!</h2>
            <img id="previewPic" src={props.selectedImage} />
            <div id="pictureChoose">
                <label htmlFor="file" id="inputlabel">
                    Choose a picture...
                    <input
                        className="inputfile"
                        id="file"
                        type="file"
                        name="file"
                        onChange={props.setFile}
                    />
                </label>
                <button onClick={props.uploadProfilePic}>Submit</button>
                {props.error && <p>SomeError</p>}
            </div>
        </div>
    );
}
