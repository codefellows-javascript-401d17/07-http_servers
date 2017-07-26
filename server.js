'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const myParse = require('./lib/myParse.js');
const PORT = process.env.PORT || 3000;

const reqMethods = {};

reqMethods.errorResponse = (req, res) => {
  res.writeHead(400, { 'content-type': 'text/plain' });
  res.write(cowsay.say({text: 'bad request'}));
}

reqMethods.postMethod = (req, res) => {
  parseBody(req, (err) => {
    if (err) console.error(err);
    
    res.writeHead(400, { 'content-type': 'text/plain' });
    res.write(cowsay.say({text: req.url.query.text}));
    res.end();
  });    
}

const server = http.createServer(function(req, res) {
  req.url = url.parse(requ.url);
  req.url.query = querystring.parse(req.url.query);

  if (req.url.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write('Hello from my server :D')
    response.end();
    return;
  }

});

server.listen(PORT, () => {
  console.log('Active Port :', PORT);
});