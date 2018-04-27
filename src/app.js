import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Logo } from "./logo";
import axios from "../axios";
import { Profilepic } from "./profilepic";
import { Profile } from "./profile";
import { Upload } from "./upload";
import { OtherProfile } from "./otherprofile";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showPictureUpload = this.showPictureUpload.bind(this);
        this.closePictureUpload = this.closePictureUpload.bind(this);
        this.uploadProfilePic = this.uploadProfilePic.bind(this);
        this.setFile = this.setFile.bind(this);
    }
    showPictureUpload() {
        this.setState({ open: true });
        this.setState({ error: false });
    }
    closePictureUpload() {
        this.setState({ open: "" });
        this.setState({ error: false });
        this.setState({ selectedImage: null });
    }

    //////////////Upload and setFile///////////////
    setFile(event) {
        let selectedImage = new FileReader();
        selectedImage.readAsDataURL(event.target.files[0]);
        selectedImage.addEventListener("load", () => {
            this.setState({ selectedImage: selectedImage.result });
        });
        this.setState({ file: event.target.files[0] });
        this.setState({ error: false });
    }
    uploadProfilePic() {
        if (this.state.file.size > 2097152) {
            this.setState({
                error: true
            });
        } else {
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
                .catch(e => {
                    console.log(e);
                });
        }
    }
    //////////////////////////////
    async componentDidMount() {
        window.addEventListener("keyup", e => {
            if (e.keyCode == "27") {
                this.closePictureUpload();
            }
        });
        try {
            const response = await axios.get("/userInfo");
            if (response.data.success) {
                this.setState({ userData: response.data.userData });
            }
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <div id="appNavigation">
                <header>
                    <a id="logout" href="/logout">
                        Logout
                    </a>
                    <Logo />
                    <a onClick={this.showPictureUpload}>
                        {this.state.userData && <Profilepic {...this.state} />}
                    </a>
                    {this.state.open && (
                        <Upload
                            {...this.state}
                            uploadProfilePic={this.uploadProfilePic}
                            closePictureUpload={this.closePictureUpload}
                            setFile={this.setFile}
                        />
                    )}
                </header>

                <BrowserRouter>
                    <div className="BrowserRouter">
                        <Link to="/">
                            <div>Profile</div>
                        </Link>
                        <Link to="/user/2">
                            <div>User2</div>
                        </Link>
                        <Link to="/user/3">
                            <div>User3</div>
                        </Link>
                        <Route
                            exact
                            path="/user/:userId"
                            component={OtherProfile}
                        />
                        <Route
                            exact
                            path="/"
                            render={() => <Profile {...this.state} />}
                        />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
