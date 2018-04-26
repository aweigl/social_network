import React from "react";
import { Logo } from "./logo";

export function Upload(props) {
    console.log("PROPS", props);
    return (
        <div id="uploadPic">
            <a onClick={props.closePictureUpload}>X</a>
            <h2>Hello, {props.userData.first}!</h2>

            <img className="previewPic" src={props.selectedImage} />
            {props.userData.profilepic &&
                !props.selectedImage && (
                    <img
                        className="previewPic"
                        src={props.userData.profilepic}
                    />
                )}
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
                {props.selectedImage && (
                    <button onClick={props.uploadProfilePic}>Submit</button>
                )}
                {props.error && (
                    <p>The file you are trying to upload is too large!</p>
                )}
            </div>
        </div>
    );
}
