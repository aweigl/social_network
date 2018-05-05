import axios from "../axios";

export const getFriendInfo = async () => {
    try {
        const response = await axios.get(`/checkFriends`);
        console.log("Good label", response);
        return {
            type: "GET_FRIEND_LIST",
            friends: response.data.friends
        };
    } catch (e) {
        console.log(e);
    }
};

export const acceptFriend = async profileId => {
    try {
        const response = await axios.post(`/acceptFriendRequest/${profileId}`);
        return {
            type: "ACCEPT_REQUEST",
            status: 2,
            profileId
        };
    } catch (e) {
        console.log(e);
    }
};

export const removeFriend = async profileId => {
    try {
        const response = await axios.post(`/endFriendship/${profileId}`);
        return {
            type: "END_FRIENDSHIP",
            profileId
        };
    } catch (e) {
        console.log(e);
    }
};

export const onlineUsers = onlineUsers => {
    return {
        type: "ONLINE_USERS",
        onlineUserList: onlineUsers
    };
};

export const userLeft = userId => {
    return {
        type: "USER_LEFT",
        userId
    };
};

export const userJoined = newUser => {
    return {
        type: "USER_JOINED",
        newUser
    };
};
