import React, {Component} from 'react';

class ChatBar extends Component {

  render() {
    const { currentUser, updateUser, postMessage } = this.props;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={ currentUser } onKeyUp={ updateUser } />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" ref={ (input) => { this.messageContent = input } } onKeyUp={ postMessage } />
      </footer>
    );
  }
}
export default ChatBar;