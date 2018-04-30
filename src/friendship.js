import React from "react";
import axios from "../axios";

export class Friendship extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.makeFriendRequest = this.makeFriendRequest.bind(this);
    }
    async componentWillReceiveProps(nextProps) {
        if (nextProps.userData.id != this.props.userData.id) {
            try {
                const response = await axios.get(
                    `/friendshipStatus/${this.props.userData.id}`
                );
                console.log(response.data);
                response.data.success
                    ? this.setState({
                          friendshipStatus: response.data.friendshipStatus
                      })
                    : console.log("unsuccessfull axios request");
            } catch (e) {
                console.log(e);
            }
        }
    }
    async componentDidMount() {
        console.log(this.props);
        try {
            const response = await axios.get(
                `/friendshipStatus/${this.props.userData.id}`
            );
            response.data.success
                ? this.setState({
                      friendshipStatus: response.data.friendshipStatus
                  })
                : console.log("unsuccessfull axios request");
        } catch (e) {
            console.log(e);
        }
    }
    async makeFriendRequest() {
        try {
            const response = await axios.post(
                `/makeFriendRequest/${this.props.userData.id}`
            );
            console.log("friend request made");
            this.setState({
                friendshipStatus: 1
            });
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <div className="friendshipButtons">
                {this.state.friendshipStatus == 0 ? (
                    <button onClick={this.makeFriendRequest}>
                        Make friend request
                    </button>
                ) : (
                    <button>Cancel friend request</button>
                )}
                {this.state.friendshipStatus == 2 && (
                    <button>End friendship</button>
                )}
            </div>
        );
    }
}
