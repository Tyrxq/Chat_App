/*
*This code snippet allows me to call the element objects in html and 
* addEventListeners. Go to line 25-34 to see the eventlisteners in action.
*/

/*
  Intializing variables for each html element object that will interact with user
  This allows me to call the html elements and addEventListeners.
  Go to line 25-34 to see the eventlisteners in action.

*/

//document.querySelector() returns the first html object in the arguement.
const btn = document.querySelector('button');
const packet = document.querySelector('h2');
const section = document.querySelector('section')
//Since the string starts with an '#' it is now looking for the element by id name. 
const measageBox = document.querySelector("#input");

//This creates a websocket object that will connect to my local computer ip address on port 8126 and on path foo. 
const ws = new WebSocket('ws://localhost:8126/foo');

//This opens the websocket and sends the server 'Hi this is web client.'.
//It also prints WebSocket Client Connected when socket is connected.
ws.onopen = function() {
    console.log('WebSocket Client Connected');
    //ws.send('Hi this is web client.');
};
ws.onmessage = function(e) {
  console.log("Received: '" + e.data + "'");
  addElement(e.data)
};

//This function grabs the input from the messagebox and sends the input to the server.
sendMeasageToServer = () =>{
  const measage = measageBox.value;
  ws.send(measage);
} 

function addElement (message) {
  // create a new div element
  const newDiv = document.createElement("div");

  // and give it some content
  const newContent = document.createTextNode(message);

  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("div1");
  section.insertBefore(newDiv, currentDiv);
}

//When user press enter on keyboard while interacting with textbox the message is sent to server.
input.addEventListener('keyup',function(e){
    if(e.keyCode == 13){
      sendMeasageToServer();
    }
    
});

