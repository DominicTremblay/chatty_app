import React, { Component } from 'react';
import Message from './Message.jsx';
import MessageSystem from './MessageSystem.jsx';

class MessageList extends Component {
  render() {

    const { messages } = this.props;
    const messageList = messages.map( message => {

                                                  if (message.type === "incomingMessage") { 
                                                    return <Message key={ message.id } message={ message } /> 
                                                  } else {
                                                    return <MessageSystem key={ message.id } content={ message.content } />
                                                  }
                                                });

    return (
    <main className="messages">
        { messageList }
    </main>
    );
  }
}
export default MessageList;