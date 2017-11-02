const express       = require('express');
const SocketServer  = require('ws');
const uuid          = require('uuid/v1'); 

const PORT = 3001;

const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer.Server({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  const types = {
    postMessage: "incomingMessage",
    postNotification: "incomingNotification"
  }


  ws.on('message', ( clientMsg ) => {

    const message = JSON.parse( clientMsg );
    message.id = uuid();
    message.type = types[message.type];
    console.log(message);
    wss.broadcast( JSON.stringify( message ));


  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});