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

    //////////////Upload and setFile///////////////
    setFile(event) {
        let selectedImage = new FileReader();
        selectedImage.readAsDataURL(event.target.files[0]);
        selectedImage.addEventListener("load", () => {
            this.setState({ selectedImage: selectedImage.result });
        });
        this.setState({ file: event.target.files[0] });
        console.log(this.state);
    }
    uploadProfilePic() {
        var formData = new FormData();
        formData.append("file", this.state.file);
        axios
            .post("/upload", formData)
            .then(response => {
                if (response.data.success) {
                    this.setState({ userData: response.data.userData });
                    this.setState({ open: false });
                    this.setState({ selectedImage: null });
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
                            {...this.state}
                            uploadProfilePic={this.uploadProfilePic}
                            setFile={this.setFile}
                        />
                    )}
                </header>
            </div>
        );
    }
}
