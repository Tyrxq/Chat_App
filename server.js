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
    if(message.message === "Client connected hjidfhngbfhbujik;gafgbwsgvhjnkl/sdbgvbksvhu"){
      users.saveUser(message.username,user);
      console.log(message.username+ " has connected");
    }
    else{
      console.log("<"+ message.username +">"+ message.message +`(sent to ${message.receiver})`);
      //console.log(message)
      users.usersOnline[message.username].send(`<${message.username}>${message.message}`);
      if (users.usersOnline[message.receiver] === undefined){
        users.usersOnline[message.username].send(`${message.receiver} is Offline`);
      }
      else{
        users.usersOnline[message.receiver].send(`<${message.username}>${message.message}`);
      }
    
    }
    
  });
});
server.listen(8126);
console.log('Listening on port 8126...');