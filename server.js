'use strict';
// imported node modules
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
// imported modules
const bodyParser = require('./lib/body-parser-helper.js');
// local host
const PORT = process.env.PORT || 3000;
// initalizing server
const server = http.createServer((request, response) => {
  request.url = url.parse(request.url);
  request.url.query = querystring.parse(request.url.query);
  response.headers = {
    'Content-Type': 'text/plain'
  };
  // NOTE: if you are going to change cows type f=="dragon" or if you are POSTing f="dragon"
  // to run this simply type: http :PORT or http localhost:PORT or http GET localhost:PORT
  if(request.method === 'GET' && request.url.pathname === '/'){
    response.statusCode = 200;
    response.write(`Content-Type: ${response.headers['Content-Type']}\n`);
    response.write(`Status: ${response.statusCode}\n`);
    response.write('Hello from my server!\n');
    response.end();
    return;
  }

  // to run this type: http :PORT/cowsay
  if(request.method === 'GET' &&  request.url.pathname === '/cowsay'){
    // to have your own messsage run: http :PORT/cowsay text=="hi all!"
    if(request.url.query.text){
      response.statusCode = 200;
      response.write(`Status: ${response.statusCode}\n`);
      response.write(cowsay.say({f: request.url.query.f, text: request.url.query.text}) + '\n');
      response.end();
      return;
    }
    // if no text is given it will error with this status code and messsage
    else{
      response.statusCode = 400;
      response.write(`Status: ${response.statusCode}\n`);
      response.write(cowsay.say({f: 'dragon', text: 'Bad request'}) + '\n');
      response.end();
      return;
    }
  }

  // to post a message type: http POST :PORT/cowsay thing="hi all!" thing2="sup"
  if(request.method === 'POST' && request.url.pathname === '/cowsay'){
    response.write(`Content-Type: ${response.headers['Content-Type']}\n`);
    bodyParser(request, function(err){
      if(err){
        response.statusCode = 400;
        response.write(`Status: ${response.statusCode}\n`);
        response.write(cowsay.say({f: 'dragon', text: 'bad request'}) + '\n');
        response.end();
        return;
      }
      response.statusCode = 200;
      response.write(`status: ${response.statusCode}\n`);
      response.write(cowsay.say({f: request.url.query.f, text: request.body.text}) + '\n');
      response.end();
      return;
    });
  }
  // NOTE: for some reason the closing end() breaks the POST block.
  // ending request
  // response.end();
  // return;
});
// listening on server for requests
server.listen(PORT, () => {
  console.log('server up at', PORT);
});
