import React from "react";
import axios from "../axios";

export class Friendship extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.makeFriendRequest = this.makeFriendRequest.bind(this);
        this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
        this.endFriendship = this.endFriendship.bind(this);
    }
    async componentDidMount() {
        try {
            const response = await axios.get(
                `/friendshipStatus/${this.props.userData.id}`
            );
            console.log(response.data.success);
            if (response.data.success) {
                response.data.userData.receiver_id == response.data.currentUser
                    ? this.setState({
                          friendshipStatus: response.data.userData.status,
                          requestRecipient: true
                      })
                    : this.setState({
                          friendshipStatus: response.data.userData.status,
                          requestRecipient: false
                      });
            } else {
                this.setState({
                    friendshipStatus: 0
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
    async componentWillReceiveProps(nextProps) {
        if (nextProps.userData.id != this.props.userData.id) {
            try {
                const response = await axios.get(
                    `/friendshipStatus/${this.props.userData.id}`
                );
                console.log(response.data.userData);
                if (response.data.success) {
                    response.data.userData.receiver_id ==
                    response.data.currentUser
                        ? this.setState({
                              friendshipStatus: response.data.userData.status,
                              requestRecipient: true
                          })
                        : this.setState({
                              friendshipStatus: response.data.userData.status,
                              requestRecipient: false
                          });
                } else {
                    this.setState({
                        friendshipStatus: 0
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
    async makeFriendRequest() {
        try {
            const response = await axios.post(
                `/makeFriendRequest/${this.props.userData.id}`
            );
            if (response.data.success) {
                this.setState({
                    friendshipStatus: 1
                });
            } else {
                this.setState({
                    friendshipStatus: 0
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
    async acceptFriendRequest() {
        try {
            const response = await axios.post(
                `/acceptFriendRequest/${this.props.userData.id}`
            );
            response.data.success
                ? this.setState({
                      friendshipStatus: 2
                  })
                : console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    async endFriendship() {
        try {
            const response = await axios.post(
                `/endFriendship/${this.props.userData.id}`
            );
            response.data.success
                ? this.setState({
                      friendshipStatus: 0
                  })
                : console.log(response);
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        console.log(this.props);
        return (
            <div className="friendshipButtons">
                <div>
                    {this.state.friendshipStatus == 0 && (
                        <button onClick={this.makeFriendRequest}>
                            Make friend request
                        </button>
                    )}
                </div>
                <div>
                    {this.state.friendshipStatus == 1 &&
                        !this.state.requestRecipient && (
                            <button onClick={this.endFriendship}>
                                Cancel friend request
                            </button>
                        )}
                </div>
                <div>
                    {this.state.requestRecipient &&
                        this.state.friendshipStatus == 1 && (
                            <button onClick={this.acceptFriendRequest}>
                                Accept friend request
                            </button>
                        )}
                </div>
                {this.state.friendshipStatus == 2 && (
                    <button onClick={this.endFriendship}>End friendship</button>
                )}
            </div>
        );
    }
}
