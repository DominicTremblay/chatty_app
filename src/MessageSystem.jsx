import React, { Component } from 'react';

class MessageSystem extends Component {

  render(){
    const { content } = this.props;
    return(
      <div className="message system">
         { content }
      </div>
    )
  }

}

export default MessageSystem;