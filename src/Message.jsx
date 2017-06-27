import React from 'react';

class Message extends React.Component {

  render() {
    return (

      <div>
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>

        <div className="message system">
          {/*Anonymous1 changed their name to nomnom.*/}
        </div>
      </div>
      
    );
  }

}

export default Message;