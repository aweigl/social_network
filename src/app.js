import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Logo } from "./logo";
import axios from "../axios";
import { Profilepic } from "./profilepic";
import { Profile } from "./profile";
import { Upload } from "./upload";
import { OtherProfile } from "./otherprofile";
import Friends from "./friends";
import Online from "./online";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showPictureUpload = this.showPictureUpload.bind(this);
        this.closePictureUpload = this.closePictureUpload.bind(this);
        this.uploadProfilePic = this.uploadProfilePic.bind(this);
        this.setFile = this.setFile.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.removeResults = this.removeResults.bind(this);
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
        window.addEventListener("mousedown", e => {
            if (e.target != document.getElementsByTagName("#userResult")) {
                this.setState({
                    searchUsers: null
                });
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
    /////////////
    inputChange(e) {
        this.search = e.target.value;
        axios.get(`/search/${this.search}`).then(response => {
            this.setState({
                searchUsers: response.data.user
            });
        });
    }
    removeResults() {
        this.setState({
            oldSearch: this.state.searchUsers,
            searchUsers: null
        });
    }

    render() {
        if (!this.state.userData) {
            return <img id="spinner" src="/spinner.gif" />;
        } else {
            let { searchUsers } = this.state;
            return (
                <div id="appNavigation">
                    <header>
                        <a id="logout" href="/logout">
                            Logout
                        </a>
                        <Logo />
                        <a onClick={this.showPictureUpload}>
                            {this.state.userData && (
                                <Profilepic {...this.state} />
                            )}
                        </a>
                        <div id="searchInput">
                            <form className="form-inline my-2 my-lg-0">
                                <input
                                    className="form-control mr-sm-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    onChange={this.inputChange}
                                />
                            </form>
                        </div>
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
                        <div>
                            {this.state.searchUsers && (
                                <div id="userResult">
                                    {searchUsers.map(user => {
                                        return (
                                            <Link
                                                to={`/user/${user.id}`}
                                                key={user.id}
                                                onClick={this.removeResults}
                                            >
                                                <p>
                                                    {user.profilepic && (
                                                        <img
                                                            src={
                                                                user.profilepic
                                                            }
                                                        />
                                                    )}
                                                    {!user.profilepic && (
                                                        <img src="/default.png" />
                                                    )}
                                                    {user.first} {user.last}
                                                </p>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    {this.state.userData.first}
                                </button>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <li id="dropdown-list">
                                        <Link id="dropdown-link" to="/">
                                            My Profile
                                        </Link>
                                    </li>
                                    <li id="dropdown-list">
                                        <Link id="dropdown-link" to="/friends">
                                            Friends
                                        </Link>
                                    </li>
                                    <li id="dropdown-list">
                                        <Link id="dropdown-link" to="/online">
                                            Who's online?
                                        </Link>
                                    </li>
                                </div>
                            </div>

                            <Route exact path="/online" component={Online} />
                            <Route exact path="/friends" component={Friends} />
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
}
