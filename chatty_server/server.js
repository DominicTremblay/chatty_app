const express       = require('express');
const SocketServer  = require('ws');
const uuid          = require('uuid/v1'); 

const PORT = 3001;

const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer.Server({ server });

const assignColor = () => {
  const hexcodeMap = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
  let hexcode = [0,0,0,0,0,0];
  hexcode = hexcode.map(e => hexcodeMap[Math.floor(Math.random() * hexcodeMap.length)] );
  return `#${hexcode.join('')}`
}

wss.broadcast = data => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

const sendUserCount = userCount => {
  const message = {
    type: "userCountNotification",
    userCount: userCount
  }
  wss.broadcast(JSON.stringify( message ));
} 

const sendUserColor = (color, ws) => {
  const message = {
    type: "userColor",
    color: color
  }
  ws.send(JSON.stringify( message ));
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  sendUserCount(wss.clients.size);
  sendUserColor(assignColor(), ws);

  const types = {
    postMessage: "incomingMessage",
    postNotification: "incomingNotification"
  }


  ws.on('message', ( clientMsg ) => {

    const message = JSON.parse( clientMsg );
    message.id = uuid();
    message.type = types[message.type];
    wss.broadcast( JSON.stringify( message ));


  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => { 
    console.log('Client disconnected');
    sendUserCount(wss.clients.size); });
});