import React from 'react';

class Message extends React.Component {

  render() {
    console.log("rendering <Message />");

    if (this.props.type === "incomingNotification") {
      return (
        <div className="message system">
          {this.props.content}
        </div>
      );
    } else {
      return (
        <div className="message">
          <span className="message-username" style={{color: this.props.color}}>
            {this.props.username}
          </span>
          <span className="message-content">
            {this.props.content}
          </span>
        </div>
      ); 
    }
    
  }

}

export default Message;