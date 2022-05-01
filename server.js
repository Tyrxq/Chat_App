/*
Create a websocket to push and pull data from clients
Clients means website/app etc  
*/


const WebSocketServer = require('ws').Server;
const http = require('http');

class Users {
  constructor() {
    this.usersOnline = {};
    this.saveUser = this.saveUser.bind(this);
  }
  saveUser(username, user){
    this.usersOnline[username] = user;
  }
}


const users = new Users();
const server = http.createServer();
const wss = new WebSocketServer({server: server, path: '/foo'});
wss.on('connection', (user) =>{
  user.on('message', (json) =>{
    const message = JSON.parse(json);
    users.saveUser(message.username,user);
    console.log("<"+ message.username +">"+ message.message);
    //console.log(message)

  
  });
});
server.listen(8126);
console.log('Listening on port 8126...');