import React from 'react';

class ChatBar extends React.Component {

  handleSubmitChat(event) {  
    if (event.key === "Enter") {
      this.props.showNewMessage(event.target.value);
      document.querySelector('.chatbar-message').value = "";
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleSubmitChat.bind(this)}/>
      </footer>
    );
  }

}

export default ChatBar;