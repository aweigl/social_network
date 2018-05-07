import React from "react";
import { getFriendInfo, acceptFriend, removeFriend } from "./actions";

export default function User(props) {
    console.log(props);

    let { friend } = props;
    let { id } = props;
    let userUrl = `user/${friend.id}`;
    return (
        <div>
            <a href={userUrl}>
                {friend.profilepic && <img src={friend.profilepic} />}
                {!friend.profilepic && <img src="default.png" />}
                <p id="userUrl">
                    {friend.first} {friend.last}
                </p>
            </a>
            {friend.status == 1 && (
                <button
                    onClick={() => {
                        props.dispatch(acceptFriend(id));
                    }}
                >
                    Accept
                </button>
            )}
            {friend.status == 2 && (
                <button
                    onClick={() => {
                        props.dispatch(removeFriend(id));
                    }}
                >
                    Remove
                </button>
            )}
        </div>
    );
}
