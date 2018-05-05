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
import initSocket from "./socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

if (location.pathname == "/welcome") {
    component = <Welcome />;
} else {
    initSocket(store);
    component = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(component, document.querySelector("main"));
