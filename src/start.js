import React from "react";
import ReactDOM from "react-dom";
import { Welcome } from "./welcome.js";
import { Logo } from "./logo.js";
import { Register } from "./register.js";
let component;

if (location.pathname == "/register") {
    component = <Register />;
} else {
    component = <Logo />;
}

ReactDOM.render(component, document.querySelector("main"));

///giving divs classes hast to have className=""!!!!
///style={{'color':'tomato'}} to change style of div
