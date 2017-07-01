import React from 'react';

class ChatBar extends React.Component {
  
  handleSubmitName(event) {
    if (event.key === "Enter") {
      const newUsername = event.target.value;
      this.props.handleNewUsername(newUsername);
    } 
  }

  handleSubmitChat(event) {  
    if (event.key === "Enter") {
      const newMessage = event.target.value;
      this.props.handleSubmit(newMessage);
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