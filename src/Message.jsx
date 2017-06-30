import React from 'react';

class Message extends React.Component {

  constructor(props){
    super(props);
    this.className = "message";
    if (this.props.type === "incomingNotification") {
      this.className += " system";
    }
  }

  render() {
    console.log("rendering <Message />");
    return (
      <div className={this.className}>
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }

}

export default Message;