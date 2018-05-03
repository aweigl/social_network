import React from "react";
import { getFriendInfo, acceptFriend, removeFriend } from "./actions";

export default function User(props) {
    console.log(props);

    let { friend } = props;
    let { id } = props;
    return (
        <div>
            {friend.profilepic && <img src={friend.profilepic} />}
            {!friend.profilepic && <img src="default.png" />}
            <p>
                {friend.first}
                {friend.last}
            </p>
            {friend.status == 1 && (
                <button
                    onClick={() => {
                        props.dispatch(acceptFriend(id));
                    }}
                >
                    Accept friend request
                </button>
            )}
            {friend.status == 2 && (
                <button
                    onClick={() => {
                        props.dispatch(removeFriend(id));
                    }}
                >
                    Remove from friend-list
                </button>
            )}
        </div>
    );
}
