import React from "react";
import { connect } from "react-redux";
import { socketEmit } from "./socket";
import { clearTyping } from "./actions";

class Chat extends React.Component {
    componentDidMount() {
        let chatField = document.getElementById("chatField");

        chatField.addEventListener("keydown", e => {
            if (e.keyCode == 13) {
                if (chatField.value.trim() == "") {
                    return null;
                } else {
                    e.preventDefault();
                    console.log(this.chatMessage);
                    socketEmit("newChatMessage", this.chatMessage);
                    this.chatMessage = null;
                    chatField.value = "";
                    socketEmit("clearTyping", {});
                }
            }
        });
    }
    componentDidUpdate() {
        this.messageBoard.scrollTop =
            this.messageBoard.scrollHeight - this.messageBoard.clientHeight;
    }
    chatChange(e) {
        this.chatMessage = e.target.value;
        socketEmit("typing", {});
    }
    render() {
        this.chatChange = this.chatChange.bind(this);
        if (!this.props) {
            return null;
        } else {
            return (
                <div className="messenger">
                    {this.props.typer && (
                        <p>
                            {this.props.typer.first}
                            ...is typing
                        </p>
                    )}
                    <div
                        id="messageBoard"
                        ref={messageBoard => (this.messageBoard = messageBoard)}
                    >
                        {this.props.chatMessages &&
                            this.props.chatMessages.map(user => {
                                return (
                                    <div key={user.key}>
                                        <div id="picUser">
                                            {!user.profilepic && (
                                                <img
                                                    className="chatPic"
                                                    src="default.png"
                                                />
                                            )}
                                            <img
                                                className="chatPic"
                                                src={user.profilepic}
                                            />
                                            <p id="chatUser">
                                                {user.first} {user.last}
                                            </p>
                                        </div>

                                        <p id="message">{user.message}</p>
                                        <p id="timestamp">{user.timestamp}</p>
                                    </div>
                                );
                            })}
                    </div>
                    <textarea
                        placeholder="Start typing..."
                        onChange={this.chatChange}
                        id="chatField"
                        ref={item => (this.chatField = item)}
                    />
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        chatMessages: state.chatMessages,
        typer: state.typer
    };
};

export default connect(mapStateToProps)(Chat);
