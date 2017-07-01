const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

const colors = ['#E74C3C', '#E67E22', '#F1C40F', '#27AE60', '#3498DB', '#9B59B6'];

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

function broadcastUser() {
  let color = colors[Math.floor(Math.random()*colors.length)];
  let userCount = {
    type: 'clientCount',
    count: wss.clients.size,
    color: color
  }
  wss.broadcast(JSON.stringify(userCount));
}

// function assignColor(ws) {

// }

wss.on('connection', (ws) => {
  console.log('Client connected');
  broadcastUser();
  // assignColor(ws);

  ws.on('message', (message) => {
    const newMessage = JSON.parse(message);

    if (newMessage.type === "postNotification") {
      newMessage.id = uuidv1();
      newMessage.type = "incomingNotification";
      wss.broadcast(JSON.stringify(newMessage));
    }
    
    if (newMessage.type === "postMessage") {
      newMessage.id = uuidv1();
      newMessage.type = "incomingMessage";
      wss.broadcast(JSON.stringify(newMessage));
    }
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
    broadcastUser();
  });
});