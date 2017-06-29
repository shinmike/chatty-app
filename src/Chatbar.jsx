import React from 'react';

class ChatBar extends React.Component {
  
  handleSubmitName(event) {
    this.props.handleNewUsername(event.target.value);
  }

  handleSubmitChat(event) {  
    if (event.key === "Enter") {
      this.props.handleSubmit(event.target.value);
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
          onKeyPress={this.handleSubmitName.bind(this)} 
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