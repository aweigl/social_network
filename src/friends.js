import React from "react";
import { connect } from "react-redux";
import { reducer } from "./reducer";

export class Friends extends React.Component {
    componentDidMount() {
        this.props.dispatch(reducer());
    }
    render() {
        return <h1>HelloWorld</h1>;
    }
}

/////MAPSTATETOPROP FUNCTION///////
//friends, and those who want to be

const mapStateToProps = state => {
    return {
        notFriends: {},
        friends: {}
    };
};

const connectedFriends = connect(mapStateToProps)(Friends);
