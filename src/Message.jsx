import React from 'react';
import MessageList from './MessageList.jsx';

class Message extends React.Component {
  render() {
    return (
      <main className="messages">
          <MessageList />
      </main>
    );
  }
}

export default Message;