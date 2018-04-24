import React from "react";
import { imgStyle } from "./welcome.js";

export function Logo() {
    return (
        <div>
            <img src="logo.png" style={imgStyle} />
        </div>
    );
}
