import React from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends React.Component {

  constructor(props) { // constructing state
    super(props); // allow children to access props from this parent state
    this.state = { // parent's state listed
      currentUser: {name: "Mike"},
      messages: [],
      count: 0
    };

    this.changeCurrentUser = this.changeCurrentUser.bind(this);
    this.sendMessageToServer = this.sendMessageToServer.bind(this);
 
  }

  // this.props.handleNewUsername in ChatBar  
  changeCurrentUser(newUsername) {
    let previousUsername = this.state.currentUser.name;
    this.setState({ currentUser: {name: newUsername} });
    const newNotification = {
      type: "postNotification",
      username: null,
      content: `User ${previousUsername} changed their name to ${newUsername}`
    } 
    this.socket.send(JSON.stringify(newNotification));
  }	 

  // this.props.handleSubmit in ChatBar
  sendMessageToServer(message, type) {
    console.log("Type of message is", type);
    console.log("Message to server is", message);
    const newMessage = {
      type: type,
      username: this.state.currentUser.name,
      content: message
    } 
    this.socket.send(JSON.stringify(newMessage)); // send to server
  }	

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = () => {
      console.log("Connected to server");
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch(data.type) {

      case "incomingMessage":
        console.log("Entering", data.type);
        const messages = this.state.messages.concat(data); // concatenates new message to exisiting messages
        this.setState({ messages: messages }); //sets updated messages
        break;

      case "incomingNotification":
        console.log("Entering", data.type);
        const notification = this.state.messages.concat(data); // concatenates new message to exisiting messages
        this.setState({ messages: notification });
        break;

      case "clientCount":
        console.log("Entering", data.type);
        const updateCount = data.count; 
        this.setState({ count: updateCount });
      break;
      
      default:
        throw new Error("Unknown event type??? " + data.type); // show an error in the console if the message type is unknown
      }

    };
  }  

  render() {
    console.log("rendering <App />");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Shinapp 👏</a>
          <p>Count: {this.state.count}</p>
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
