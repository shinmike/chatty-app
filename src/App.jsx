import React from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends React.Component {

  constructor(props) { // constructing state
    super(props); // allow children to access props from this parent state
    this.state = { // parent's state listed
      currentUser: {name: 'Mike', color: ''},
      messages: [],
      count: 0
    };

    this.changeCurrentUser = this.changeCurrentUser.bind(this);
    this.sendMessageToServer = this.sendMessageToServer.bind(this);
 
  }

  // this.props.handleNewUsername in ChatBar  
  changeCurrentUser(newUsername) {
    const previousUsername = this.state.currentUser.name;
    this.setState({ currentUser: {name: newUsername} });
    const newNotification = {
      type: 'postNotification',
      username: this.state.currentUser.name,
      color: this.state.currentUser.color,
      content: `User ${previousUsername} changed their name to ${newUsername}`
    } 
    this.socket.send(JSON.stringify(newNotification));
  }	 

  // this.props.handleSubmit in ChatBar
  sendMessageToServer(message) {
    console.log('Message to server is', message);
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      color: this.state.currentUser.color,
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
        const messages = this.state.messages.concat(data); 
        this.setState({ messages: messages });
        this.setState({
          currentUser: {name: this.state.currentUser.name, color: data.color}
        })
      break;

      case "incomingNotification":
        console.log("Entering", data.type);
        const notification = this.state.messages.concat(data); 
        this.setState({ messages: notification });
        this.setState({
          currentUser: {name: this.state.currentUser.name, color: data.color}
        })
      break;

      case "clientCount":
        console.log("Entering", data.type);
        const updateCount = data.count; 
        this.setState({ count: updateCount });
      break;



      case "clientColor":
        console.log("Entering", data.type);
        this.setState({
          currentUser: {name: this.state.currentUser.name, color: data.color}
        })
      break;



      default:
        throw new Error("Unknown event type??? " + data.type); // show an error in the console if the message type is unknown
      }

    };
  }  

  render() {
    console.log("rendering <App />");
    let userWord = this.state.count === 1 ? 'user' : 'users';
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Shinapp 👏</a>
          <p className="navbar-count">{this.state.count} {userWord} online</p>
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
