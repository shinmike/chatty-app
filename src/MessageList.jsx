import React from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {

  render() {
    return (
      <main className="messages" >
        {this.props.messages.map((message, index) => {
          return ( // return messages array (in App.jsx) and loop
            <div key={index}>
              <Message username={message.username} content={message.content} />
            </div>
          );
        })}
        {/*<div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>  */}
      </main>
    );
  }

}

export default MessageList;