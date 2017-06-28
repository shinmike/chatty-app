import React from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends React.Component {

  constructor(props) { // constructing state
    super(props); // allow children to access props from this parent state
    this.state = { // parent's state listed
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };

    this.socket = new WebSocket("ws://localhost:3001");

    this.showNewMessage = this.showNewMessage.bind(this);
    
  }

  showNewMessage(newMessage) {
    const message = this.state.messages.concat({
      id: Math.random(),
      username: this.state.currentUser.name,
      content: newMessage
    });
    this.setState({messages: message});
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket.onopen = () => {
      console.log('Connected to server');
    }
  }

  render() {
    console.log("rendering <App />");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} showNewMessage={this.showNewMessage} />
      </div>
    );
  }

}

export default App;
