import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reducer } from "./reducer";
import { getFriendInfo, acceptFriend } from "./actions";
import User from "./users";

class Friends extends React.Component {
    componentDidMount() {
        this.props.dispatch(getFriendInfo());
    }
    render() {
        console.log(this.props.friends);
        let { friends } = this.props;
        let { notFriends } = this.props;
        if (!this.props.friends) {
            return null;
        } else {
            return (
                <div id="friendList">
                    <div id="notation">YOUR FRIENDS</div>
                    <div className="friends">
                        {friends.map(friend => (
                            <User
                                id={friend.id}
                                {...this.props}
                                friend={friend}
                                key={friend.id}
                            />
                        ))}
                    </div>
                    <div id="notation">FRIEND REQUESTS</div>
                    <div className="notFriends">
                        {notFriends.map(friend => (
                            <User
                                id={friend.id}
                                {...this.props}
                                friend={friend}
                                key={friend.id}
                            />
                        ))}
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    console.log(state.friends);
    return {
        notFriends:
            state.friends && state.friends.filter(friend => friend.status == 1),
        friends:
            state.friends && state.friends.filter(friend => friend.status == 2)
    };
};

export default connect(mapStateToProps)(Friends);
