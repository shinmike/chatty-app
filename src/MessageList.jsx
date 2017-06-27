import React from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {
  render() {
    return (
      <main className="messages">
          <Message />
      </main>
    );
  }
}

export default MessageList;