import React from "react";
import { connect } from "react-redux";
import { socketEmit } from "./socket";
import { clearTyping } from "./actions";
import { Link } from "react-router-dom";

class Chat extends React.Component {
    componentDidMount() {
        let chatField = document.getElementById("chatField");

        chatField.addEventListener("keydown", e => {
            if (e.keyCode == 13) {
                if (chatField.value.trim() == "") {
                    return null;
                } else {
                    e.preventDefault();
                    socketEmit("newChatMessage", this.chatMessage);
                    this.chatMessage = null;
                    chatField.value = "";
                    socketEmit("clearTyping", {});
                }
            }
        });

        document.addEventListener("keydown", e => {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                socketEmit("clearTyping", {});
            }, 2000);
        });
    }
    componentDidUpdate() {
        this.messageBoard.scrollTop =
            this.messageBoard.scrollHeight - this.messageBoard.clientHeight;
    }
    chatChange(e) {
        this.chatMessage = e.target.value;
        if (e.target.value) {
            socketEmit("typing", {});
        } else {
            socketEmit("clearTyping", {});
        }
    }
    render() {
        this.chatChange = this.chatChange.bind(this);
        if (!this.props) {
            return null;
        } else {
            return (
                <div className="messenger">
                    {this.props.typer && (
                        <p id="typing">
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
                                            <div id="nameTime">
                                                <p id="chatUser">
                                                    <Link
                                                        id="link"
                                                        ref={item =>
                                                            (this.link = item)
                                                        }
                                                        to={`user/${user.id}`}
                                                    >
                                                        {user.first} {user.last}
                                                    </Link>
                                                </p>
                                                <p id="timestamp">
                                                    {user.timestamp}
                                                </p>
                                            </div>
                                        </div>

                                        <p id="message">{user.message}</p>
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
