import React from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {

  render() {
    console.log("rendering <MessageList />");
    return (
      <main className="messages" >
        {
          this.props.messages.map((message) => {
            return ( // return messages array (in App.jsx) and loop
              <div key={message.id}>
                <Message 
                  username={message.username} 
                  content={message.content} 
                />
              </div>
            );
          })
        }
        <div className="message system">
          { 
            (this.props.notification) ? this.props.notification : null 
          }
        </div>  
      </main>
    );
  }

}

export default MessageList;