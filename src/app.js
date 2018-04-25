import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import { Logo } from "./logo";
import axios from "../axios";
import { Profile } from "./profile";
import { Upload } from "./upload";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showPictureUpload = this.showPictureUpload.bind(this);
        this.uploadProfilePic = this.uploadProfilePic.bind(this);
        this.setFile = this.setFile.bind(this);
    }
    showPictureUpload() {
        this.setState({ open: true });
    }

    ////////////////////////////////////////////
    setFile(event) {
        this.setState({ file: event.target.files[0] });
        console.log(this.state);
    }
    uploadProfilePic() {
        var formData = new FormData();
        formData.append("file", this.state.file);
        console.log(this.state.file);
        console.log(formData);
        axios
            .post("/upload", formData)
            .then(function(response) {
                if (response.data.success) {
                    console.log("amazon has all my shit");
                }
            })
            .catch(function(e) {
                console.log(e);
            });
    }
    //////////////////////////////
    componentDidMount() {
        axios
            .get("/user")
            .then(response => {
                if (response.data.success) {
                    this.setState({ userData: response.data.userData });
                }
            })
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        return (
            <div>
                <header>
                    <Logo />
                    <a onClick={this.showPictureUpload}>
                        {this.state.userData && <Profile {...this.state} />}
                    </a>
                    {this.state.open && (
                        <Upload
                            uploadProfilePic={this.uploadProfilePic}
                            setFile={this.setFile}
                        />
                    )}
                </header>
            </div>
        );
    }
}
