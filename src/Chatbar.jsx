import React from 'react';

class ChatBar extends React.Component {
  
  handleSubmitName(event) {
    if (event.key === "Enter") {
      // const type = "postNotification";
      const newUsername = event.target.value;
      // const notificationMessage = `User ${this.props.currentUser} changed their name to ${newUsername}`;
      // this.props.handleSubmit(notificationMessage, type);
      this.props.handleNewUsername(newUsername);
    } 
  }

  handleSubmitChat(event) {  
    if (event.key === "Enter") {
      const type = "postMessage";
      const newMessage = event.target.value;
      this.props.handleSubmit(newMessage, type);
      event.target.value = "";
    }
  }

  render() {
    console.log("rendering <Chatbar />");
    return (
      <footer className="chatbar">
        <input 
          className="chatbar-username" 
          defaultValue={this.props.currentUser}
          onKeyUp={this.handleSubmitName.bind(this)} 
        />
        <input 
          className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          onKeyPress={this.handleSubmitChat.bind(this)}
        />
      </footer>
    );
  }

}

export default ChatBar;