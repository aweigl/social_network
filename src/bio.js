import React from "react";

export function Bio(props) {
    return (
        <div>
            {!props.changeBio &&
                !props.userData.bio && (
                    <a href="#" onClick={props.bioChange}>
                        No bio yet? Click here to change that!
                    </a>
                )}
            {props.changeBio &&
                !props.successfullBioEdit && (
                    <div>
                        <textarea
                            type="text"
                            name="bio"
                            onChange={props.inputChange}
                        />
                        <button onClick={props.submitBio}>Save</button>
                    </div>
                )}
            {props.userData.bio && (
                <div>
                    <p>{props.userData.bio}</p>
                    <a href="#" onClick={props.editBio}>
                        Edit
                    </a>
                </div>
            )}
        </div>
    );
}
