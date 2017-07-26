'use strict';

const http = require('http');
const url = require('url');
const os = require('os');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(request, response) {
  request.url = url.parse(request.url);
  request.url.query = querystring.parse(request.url.query);

  if (request.url.pathname === '/') {
    response.writeHead(200, { 'content-type': 'text/plain' });
    response.write('Welcome to Nathan\'s HTTP Server!');
    response.write(os.EOL);
    response.write('GET /help for a list of commands.');
    response.write(os.EOL);
    response.end();
    return;
  }

  switch (request.method) {
  case 'GET':
    processGetRequest(request, response);
    break;
  case 'POST':
    processPostRequest(request, response);
    break;
  default:
    processDefaultRequest(request, response);
    break;
  }  
});

function processGetRequest(request, response) {
  if (request.url.pathname === '/help') {
    response.writeHead(200, { 'content-type': 'text/plain' });
    response.write('Query Parameters:');
    response.write(os.EOL);
    response.write('"text": What the cow will say.');
    response.write(os.EOL);
    response.write('"cow": Which cow to use.');
    response.write(os.EOL);
    response.write(os.EOL);
    response.write('Cows:');
    response.write(os.EOL);
    cowsay.list(function(err, files) {
      files.forEach(function(file) {
        response.write(file);
        response.write(os.EOL);
      });

      response.end();
    });
  } 
  else if (request.url.query.text) {
    let cowOptions = {};
    cowOptions.text = request.url.query.text;

    if (request.url.query.cow) {
      cowOptions.f = request.url.query.cow;
    }

    response.writeHead(200, { 'content-type': 'text/plain' });
    response.write(cowsay.say(cowOptions));
    response.end();
  } 
  else {
    writeBadRequest(request, response);
    response.end();
  }
}

function processPostRequest(request, response) {
  parseBody(request, function(err) {
    if (err || !request.body.text) {
      writeBadRequest(request, response);
    } else {
      let cowOptions = {};
      cowOptions.text = request.body.text;

      if (request.body.cow) {
        cowOptions.f = request.body.cow;
      }
      response.writeHead(200, { 'content-type': 'text/plain' });
      response.write(cowsay.say(cowOptions));
    }

    response.end();
  });    
}

function writeBadRequest(request, response) {
  response.writeHead(400, { 'content-type': 'text/plain' });
  response.write(cowsay.say({text: 'bad request'}));
}

function processDefaultRequest(request, response) {
  response.writeHead(400, { 'content-type': 'text/plain' });
  response.write('Only GET and POST requests are currently supported.');
  response.end();
}

server.listen(PORT, function() {
  console.log('Listening on port:', PORT);
});