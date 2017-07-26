'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res){
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if(req.url.pathname === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write('hello from my server');
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    let params = req.url.query;
    if(params.text) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write(cowsay.say({ text: params.text }));
    } else {
      res.writeHead(400);
      res.write(cowsay.say({ text: 'bad request' }));
    }
  }

  if(req.method === 'POST' && req.url.pathname === '/cowsay') {
    parseBody(req, function(err) {
      if(req.body.text) {
        if(err) return console.error(err);
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.write(cowsay.say({ text: req.body.text }));
      } else {
        res.writeHead(400);
        res.write(cowsay.say({ text: 'bad request' }));
      }
      res.end();
    });
  } else {
    res.end();
  }
});

server.listen(PORT, function(){
  console.log('server up:', PORT);
});
