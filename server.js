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

  if(req.method === 'POST' && req.url.pathname === '/cowsay')
    parseBody(req, function(err) {
      if(err) {
        res.statusCode = 400;
        res.write(400, cowsay.say({text: 'bad request', f: 'mutilated'}));
        res.end()
      } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: req.body.text, f: 'tux'}));
        res.end();
      }
    });
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    let params = req.url.query;
   
    if(params.text) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('hello from my server!');
      res.write(cowsay.say({text: params.text, f: 'tux'}));
    } else {
      res.statusCode = 400;
      res.write(cowsay.say({text: 'bad request', f: 'mutilated'}));
      res.end();
    }
  }

  if(req.method === 'GET' && req.url.pathname === '/') {
    let params = req.url.query;
    res.write(cowsay.say({text: 'Hello from my server!'}));
    res.end();
  }

  res.end();
}).listen(PORT, function() {
  console.log('Server on PORT:', PORT);
});