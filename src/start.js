import React from "react";
import ReactDOM from "react-dom";
import { Welcome } from "./welcome.js";
import { Logo } from "./logo.js";
import { Register } from "./register.js";
import { App } from "./app.js";
let component;

if (location.pathname == "/welcome") {
    component = <Welcome />;
} else {
    component = <App />;
}

ReactDOM.render(component, document.querySelector("main"));

///giving divs classes hast to have className=""!!!!
///style={{'color':'tomato'}} to change style of div
