import React from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends React.Component {

  constructor(props) { // constructing state
    super(props); // allow children to access props from this parent state
    this.state = { // parent's state listed
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [] // messages coming from the server will be stored here as they arrive
    };

    this.socket = new WebSocket("ws://localhost:3001");

    this.changeCurrentUser = this.changeCurrentUser.bind(this);
    this.sendMessageToServer = this.sendMessageToServer.bind(this);
 
  }

  changeCurrentUser(newUsername) {
    this.setState({ currentUser: {name: newUsername} });
  }	 

  sendMessageToServer(newMessage) {
    console.log('Message to server is', newMessage);
    const message = {
      username: this.state.currentUser.name,
      content: newMessage
    } 
    this.socket.send(JSON.stringify(message)); // send to server
  }	

  componentDidMount() {
    console.log("componentDidMount <App />");
    
    this.socket.onopen = () => {
      console.log('Connected to server');
    }

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const newState = this.state.messages.concat(message); // concatenates new message to exisiting messages
      this.setState({ messages: newState }); //sets updated messages
    };
  }  

  render() {
    console.log("rendering <App />");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList 
          messages={this.state.messages} 
        />
        <ChatBar 
          currentUser={this.state.currentUser.name} 
          handleSubmit={this.sendMessageToServer} 
          handleNewUsername={this.changeCurrentUser} 
        />
      </div>
    );
  }

}

export default App;
