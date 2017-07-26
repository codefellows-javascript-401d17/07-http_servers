'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse_body.js');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function (req, rsp) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if (req.method === 'POST') {

    parseBody(req, function (err) {
      if (err) return console.error(err);
      if (Object.keys(req.body).length > 0) {
        rsp.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
        rsp.write(cowsay.say({ text: req.body.text }));
        rsp.end();
      }
      if (Object.keys(req.body).length === 0) {
        rsp.writeHead(400, 'Bad Request', { 'Content-Type': 'text/plain' });
        rsp.write(cowsay.say({ text : 'bad request' }));
        rsp.end();
      }

    });
  }
  if (req.method === 'GET' && req.url.pathname === '/') {
    rsp.writeHead(200, 'OK', { 'Content-Type': 'text/plain' })
    console.log(req);
    rsp.write('hello from my server');
  }

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    let params = req.url.query;
    console.log('my querystring params', params);

    if (Object.keys(params).length > 0) {
      rsp.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
      rsp.write(cowsay.say({ text: params.text }));
      rsp.end();
    } else {
      rsp.writeHead(400);
      rsp.write(cowsay.say({ text: 'bad request' }));
      rsp.end();
    }
  }
});

server.listen(PORT, function () {
  console.log('listening on port ', PORT);
})