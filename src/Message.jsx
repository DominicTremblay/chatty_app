import React, {Component} from 'react';

class Message extends Component {
  render() {
    
    const { message } = this.props;
    
    const divStyle = {
      color: message.color
    }

    const isImage = content => {
      const regex = new RegExp(/\.(gif|jpg|jpeg|tiff|png)$/, 'i');
      return regex.test(content);
    }

    const output = content => {

      const imgStyle = {
        width: '60%'
      }

      if (isImage(content)) {
        return (<img style={ imgStyle } src={ content } />)
      }
        return content
    }

    return (
      <div style={ divStyle } className="message">
        <span className="message-username">{ message.username }</span>
        <span className="message-content">{ output(message.content) }</span>
      </div>
    );
  }
}
export default Message;