'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  console.log('req query', req.url.query);
  console.log('req url', req.url);

  if (req.method === 'POST') {
    parseBody(req, function(err) {
      if (err) return console.error(err);
    });
  }

  if (req.method === 'POST' && req.url.pathname === '/cowsay') {
    parseBody(req, function(err) {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.write(cowsay.say({ text: 'You Made a Bad Request. MOOO!!!' }));
        return console.error(err);
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(cowsay.say({ text: `${req.url.query.text}` }));
    });
  }

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    if (req.url.query.text) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(cowsay.say({ text: `${req.url.query.text}` }));
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write(cowsay.say({ text: 'Bad Request' }));
    }
    res.end();
  }

  if (req.method === 'GET' && req.url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('hello from my server');
  }

  res.end();
});
server.listen(PORT, function() {
  console.log('server up:', PORT);
});