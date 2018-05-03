import axios from "../axios";

export const reducer = (state = {}, action) => {
    if (action.type == "GET_FRIEND_LIST") {
        return axios.get("fdsohaoshfsafdafsfs");
    }
};
