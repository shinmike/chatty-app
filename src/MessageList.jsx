import React from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {

  render() {
    return (
      <div>
        {this.props.messages.map((message) => {
          return ( // return messages array (in App.jsx) and loop
            <div className="message" key={message.id}>
              <main className="messages">
                <Message username={message.username} content={message.content} />
              </main>
            </div>
          );
        })}
      </div>
    );
  }

}

export default MessageList;