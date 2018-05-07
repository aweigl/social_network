export const reducer = (state = {}, action) => {
    if (action.type == "GET_FRIEND_LIST") {
        const { friends } = action;
        return { ...state, friends };
    }
    if (action.type == "ACCEPT_REQUEST") {
        const { status } = action;
        state.friends.forEach(user => {
            if (user.id == action.profileId) {
                user.status = 2;
            }
        });
        return { ...state, status };
    }
    if (action.type == "END_FRIENDSHIP") {
        const friends = state.friends.filter(
            friend => friend.id != action.profileId
        );
        return { ...state, friends };
    }
    if (action.type == "ONLINE_USERS") {
        const { onlineUserList } = action;
        return { ...state, ...onlineUserList };
    }
    if (action.type == "USER_JOINED") {
        let newUser = action.newUser.newUser;
        return {
            ...state,
            onlineUserList: state.onlineUserList.concat(newUser)
        };
    }
    if (action.type == "USER_LEFT") {
        let userId = action.userId.userId;
        const onlineUserList = state.onlineUserList.filter(
            user => user.id != userId
        );
        return { ...state, onlineUserList };
    }
    return state;
};
