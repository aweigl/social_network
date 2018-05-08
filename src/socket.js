import * as io from "socket.io-client";
import {
    onlineUsers,
    userJoined,
    userLeft,
    chatMessages,
    typing,
    clearTyping
} from "./actions";

let socket;

export default function init(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("onlineUsers", data => {
            store.dispatch(onlineUsers(data));
        });

        socket.on("userJoined", data => {
            store.dispatch(userJoined(data));
        });

        socket.on("userLeft", data => {
            store.dispatch(userLeft(data));
        });
        socket.on("chatMessages", data => {
            store.dispatch(chatMessages(data));
        });
        socket.on("typing", data => {
            store.dispatch(typing(data));
        });
        socket.on("clearTyping", () => {
            store.dispatch(clearTyping());
        });
    }
    return socket;
}

export function socketEmit(eventName, data) {
    socket.emit(eventName, data);
}
