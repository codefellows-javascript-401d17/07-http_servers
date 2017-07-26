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

  if(req.method === 'POST') {
    parseBody(req, function(err) {
      if(err) return console.error(err);
      if(req.body.text) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: req.body.text}));
      } else {
        res.statusCode = 400;
        res.write(400, cowsay.say({text: 'bad request'}));
      }
    });
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    let params = req.url.query;
    res.statusCode = 200;
    res.write(cowsay.say({text: params.text}));
    res.end();
  }

  if(req.method === 'GET' && req.url.pathname === '/') {
    let params = req.url.query;
    res.write(cowsay.say(200, {text: 'Hello from my server!'}));
    res.end();
  }

  res.end();
}).listen(PORT, function() {
  console.log('Server on PORT:', PORT);
});