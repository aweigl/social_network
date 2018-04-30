import React from "react";
import axios from "../axios";
import { Friendship } from "./friendship";

export class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.userId != this.state.userData.id) {
            try {
                let response = await axios.get(
                    `/userInfo/${nextProps.match.params.userId}`
                );
                console.log(response.data.sameUser);
                if (response.data.sameUser) {
                    this.props.history.push("/");
                } else if (response.data.success) {
                    this.setState({
                        userData: response.data.userInfo
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
    async componentDidMount() {
        try {
            let response = await axios.get(
                `/userInfo/${this.props.match.params.userId}`
            );
            console.log(response.data.sameUser);
            if (response.data.sameUser) {
                this.props.history.push("/");
            } else if (response.data.success) {
                this.setState({
                    userData: response.data.userInfo
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <div id="profile">
                {this.state.userData && (
                    <div id="profileText">
                        <div className="bio-cropper">
                            <img
                                src={
                                    this.state.userData.profilepic ||
                                    "/default.png"
                                }
                            />
                        </div>
                        <h1>
                            {this.state.userData.first}{" "}
                            {this.state.userData.last}
                        </h1>
                        <Friendship {...this.state} />
                    </div>
                )}
            </div>
        );
    }
}
