import React from "react";

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                {this.props.userData && (
                    <div>
                        <img src={this.props.userData.profilepic} />
                        <h1>
                            {this.props.userData.first}
                            {this.props.userData.last}
                        </h1>
                    </div>
                )}
            </div>
        );
    }
}
