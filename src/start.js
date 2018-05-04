import React from "react";
import ReactDOM from "react-dom";
import { Welcome } from "./welcome";
import { Logo } from "./logo";
import { Register } from "./register";
import { App } from "./app";
let component;
////Redux//////
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { reducer } from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

////SOCKET.IO/////
import * as io from "socket.io-client";
const socket = io.connect();

socket.on("currentUser", data => {
    console.log(data);
});

if (location.pathname == "/welcome") {
    component = <Welcome />;
} else {
    component = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(component, document.querySelector("main"));
