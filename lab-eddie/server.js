'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const myParse = require('./lib/myParse.js');
const PORT = process.env.PORT || 3000;

const reqMethods = {};

reqMethods.default = (req, res) => {
  res.writeHead(400, { 'content-type': 'text/plain' });
  res.write(cowsay.say({text: 'whoops, bad request'}));
  res.end()
}

reqMethods.POST = (req, res) => {
  myParse(req, (err) => {
    if (err) console.error(err);
    if(!req.url.query.text) return reqMethods.default(req, res);
    
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write(cowsay.say({text: req.url.query.text}));
    res.end();
  });    
}

reqMethods.GET = (req, res, callback) => {
  myParse(req, (err) => {
    if (err) console.error(err);
    if(!req.url.query.text) return reqMethods.default(req, res);
    
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write(cowsay.say({text: req.url.query.text}));
    res.end();
  });    
}

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  if (req.url.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write('Hello from my server :D')
    res.end();
    return;
  } else if (req.url.pathname === '/cowsay'){
    console.log(req.method);
    reqMethods[req.method] ? reqMethods[req.method](req, res):
    reqMethods.default(req, res);
  } else {
    reqMethods.default(req, res);
  }
});

server.listen(PORT, () => {
  console.log('Active Port :', PORT);
});