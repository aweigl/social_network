import React from "react";
import axios from "../axios";
import { Bio } from "./bio";

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.bioChange = this.bioChange.bind(this);
        this.submitBio = this.submitBio.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.editBio = this.editBio.bind(this);
    }
    bioChange() {
        this.setState({
            changeBio: true
        });
    }
    inputChange(e) {
        this.setState({
            bio: e.target.value
        });
    }
    submitBio() {
        axios.post("/bioSubmission", this.state).then(response => {
            this.setState({
                userData: response.data.userData,
                successfullBioEdit: true
            });
        });
    }
    editBio() {
        this.setState({
            changeBio: true,
            successfullBioEdit: false
        });
    }
    //////////////////////////
    render() {
        return (
            <div id="profile">
                {this.props.userData && (
                    <div>
                        {this.props.userData.profilepic && (
                            <img src={this.props.userData.profilepic} />
                        )}
                        {!this.props.userData.profilepic && (
                            <img src="/default.png" />
                        )}
                        <h1>
                            {this.props.userData.first}
                            {this.props.userData.last}
                        </h1>
                        <Bio
                            {...this.props}
                            {...this.state}
                            editBio={this.editBio}
                            inputChange={this.inputChange}
                            bioChange={this.bioChange}
                            submitBio={this.submitBio}
                        />
                    </div>
                )}
            </div>
        );
    }
}
