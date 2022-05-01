/*
Create a websocket to push and pull data from clients
Clients means website/app etc  
*/


const WebSocketServer = require('ws').Server;
const http = require('http');


const server = http.createServer();
const wss = new WebSocketServer({server: server, path: '/foo'});
wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    wss.clients.forEach(function each(client) {
      //if (client.readyState === WebSocket.OPEN) {
        console.log(data.toString('utf8'));
        console.log(client)
        client.send(data.toString('utf8'));
        client.emit
      //}
    });
  });
});
server.listen(8126);
console.log('Listening on port 8126...');