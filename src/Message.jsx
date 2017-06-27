import React, {Component} from 'react';
import MessageList from './MessageList.jsx';

class Message extends Component {
  render() {
    return (
      <main className="messages">
          <MessageList />
      </main>
    );
  }
}

export default Message;