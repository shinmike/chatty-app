import React from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {
  render() {
    console.log('Rendering <MessageList />');
    return (
      <main className="messages">
        <Message messages={this.props.messages} />
      </main>
    );
  }
}

export default MessageList;