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

  if(req.method === 'GET' && req.url.pathname ==='/cowsay') {
    if(req.url.query.text) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write(cowsay.say({text: req.url.query}));
      res.end();
    }
  }

  if (req.method ==='POST') {
    parseBody(req, function(err) {
      if (err) return console.error(err);
      console.log('POST req body:', req.body);
    });
  }
});

server.listen(PORT, function() {
  console.log('server is up on:', PORT);
});
