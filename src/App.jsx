import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor() {
    super();
  
    this.ENTER_KEY    = 13;
    
    this.state = {
      
      currentUser: { name: 'Anonymous' },
      
      messages: [],
      userColor: '#000000',
      userCount: 0
    };
  }

  createNewMsg = ( content, type, username = this.state.currentUser.name, color = this.state.userColor ) => {
    
    const newMessage = {
      username,
      content,
      type,
      color
    };

    return newMessage;

  }

  sendNewMsg = msg => {
    this.socket.send( JSON.stringify( msg ) );
  }

  postMessage = e => {

    if ( e.keyCode === this.ENTER_KEY ) {
      const messageContent = e.target.value;
      const messages = [ ... this.state.messages ];
      const newMessage = this.createNewMsg(messageContent, "postMessage");
      this.sendNewMsg( newMessage );
    }

  }

  updateUser = e => {
    if ( e.keyCode === this.ENTER_KEY ) {
      const username = e.target.value;
      const content = `User ${ this.state.currentUser.name} has changed his name to ${ username }`;
      this.setState({currentUser: { name: username }});
      const newMessage = this.createNewMsg( content, "postNotification", username );
      this.sendNewMsg( newMessage );
    }
  }

  updateMessages = message => {
    const messages = this.state.messages;
    messages.push( message );
    this.setState({ messages });
  }

  updateUserCount = message => {
    this.setState({ userCount: message.userCount });
  }

  updateUserColor = message => {
    this.setState({ userColor: message.color })
  }

  componentDidMount() {
    const url = 'ws://localhost:3001';
    this.socket = new WebSocket(url);
    this.socket.onopen = (event) => {
      console.log("Connected to socket server");
    }

    this.socket.onmessage = ( event ) => {
      const types = {
        incomingMessage: this.updateMessages,
        incomingNotification: this.updateMessages,
        userCountNotification: this.updateUserCount,
        userColor: this.updateUserColor
      };

      const incomingMsg = JSON.parse( event.data );
      const updateFn = types[incomingMsg.type]; 
      updateFn(incomingMsg); 

    }

    this.socket.onerror = (error) => {
      console.log('WebSocket Error: ' + error);
    };

    this.socket.onclose = (event) => {
      console.log('Client disconnected from socket.');
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>

          <span className="user-count">{ this.state.userCount } users online</span>

        </nav>

        <MessageList messages={ this.state.messages } />
        <ChatBar currentUser={ this.state.currentUser.name } userCount={ this.state.userCount } postMessage={ this.postMessage } updateUser={ this.updateUser } />
      </div>
    );
  }
}
export default App;
