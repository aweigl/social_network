import React from "react";

export function Bio(props) {
    return (
        <div id="bioText">
            {!props.changeBio &&
                !props.userData.bio && (
                    <a href="#" onClick={props.bioChange}>
                        No bio yet? Click here to change that!
                    </a>
                )}
            {props.changeBio &&
                !props.successfullBioEdit && (
                    <div id="bioInput">
                        <textarea
                            type="text"
                            name="bio"
                            onChange={props.inputChange}
                            defaultValue={props.userData.bio}
                        />
                        <button onClick={props.submitBio}>Save</button>
                    </div>
                )}
            {props.userData.bio && (
                <div>
                    <p>{props.userData.bio}</p>
                    <button onClick={props.editBio}>Edit</button>
                </div>
            )}
        </div>
    );
}
