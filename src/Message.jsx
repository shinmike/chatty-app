import React from 'react';

class Message extends React.Component {
  render() {
    console.log('Rendering <Message />');
    return (
      <div>
        {this.props.messages.map((message) => {
          return (
            <div className="message" key={message.id}>
              <span className="message-username">{message.username}</span>
              <span className="message-content">{message.content}</span>
            </div>
          );
        })}
        <div className="message system">
          {/*Anonymous1 changed their name to nomnom.*/}
        </div>
      </div>
    );
  }
}

export default Message;