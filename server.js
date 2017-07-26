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

  if (req.method === 'POST' && req.url.pathname ==='/') {
    parseBody(req, function(err) {
      if (err) return console.error(err);
      console.log('POST req body:', req.body);
    });
  }

  if (req.method === 'POST' && req.url.pathname ==='/cowsay') {
    parseBody(req, function(err) {
      if (req.body.text) {
        res.writeHead(200, { 'Content-Type': 'text/plain'});
        res.write(cowsay.say({ text: req.body.text }));
        res.end();
      } else {
        console.error('error:', err);
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({ text: 'bad POST request'}));
        res.end();
      }
    });
  }

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    let params = req.url.query;

    if (params.text) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(cowsay.say({ text: params.text }));
      res.end();

    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write(cowsay.say({ text: 'bad GET request' }));
      res.end();
    }
  }

  if (req.url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('WELCOME TO MY SERVER');
    res.end();
  }
});

server.listen(PORT, function() {
  console.log('Server on:', PORT);
});
