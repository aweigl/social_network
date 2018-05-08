import React from "react";
import { connect } from "react-redux";
import { reducer } from "./reducer";
import { Link } from "react-router-dom";

class Online extends React.Component {
    render() {
        let { onlineUserList } = this.props;
        if (!this.props.onlineUserList) {
            return null;
        } else {
            return (
                <div id="onlineDivs">
                    {onlineUserList.map(user => (
                        <div key={user.id} id="onlineUsers">
                            <img src={user.profilepic} />
                            {!user.profilepic && <img src="default.png" />}
                            {user.first} {user.last}
                        </div>
                    ))}
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        onlineUserList: state && state.onlineUserList
    };
};

export default connect(mapStateToProps)(Online);
