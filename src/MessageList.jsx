import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {

    const { messages } = this.props;
    const messageList = messages.map( message => {

                                                  if (message.type === "incomingMessage") { 
                                                    return <Message key={ message.id } message = { message } /> 
                                                  } else {
                                                    return( <div key={ message.id } className="message system">
                                                             { message.content }
                                                            </div> );
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