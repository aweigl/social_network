import axios from "../axios";

export const getFriendInfo = id => {
    return {
        type: "GET_FRIEND_LIST",
        status
    };
};
