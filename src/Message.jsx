import React from 'react';

class Message extends React.Component {

  render() {
    console.log("rendering <Message />");
    return (
      <div className="message">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }

}

export default Message;