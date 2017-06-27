import React from 'react';

class ChatBar extends React.Component {
  render() {
    console.log('Rendering <ChatBar />');
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;