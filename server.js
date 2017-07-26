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
      console.log('POST request body:', req.body);
    });
  }

  if (req.method === 'POST' && req.url.pathname === '/cowsay') {
    parseBody(req, function(err) {
      console.log('hello');
      if(err) {
        console.log('bye');
        res.writeHead(400, {
          'Content-type': 'text-plain'
        });
        res.write(cowsay.say({
          text: 'oops, you mooooootilated that request!', f: 'mutilated'
        }));
        res.end();
      } else {
        res.writeHead(200, {
          'Content-type': 'text-plain'
        });
        res.write(cowsay.say({
          text: req.body.text
        }));
        res.end();
      }
    });
  }

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    let params = req.url.query;
    if (!params.text) {
      res.statusCode = 400;
      res.write(cowsay.say({
        text: 'oops, you mooooootilated that request!', f: 'mutilated'
      }));
      res.end();
    }else{
      res.statusCode = 200;
      res.write(cowsay.say({ text: params.text }));
      res.end();
    }
  }

  if (req.method === 'GET' && req.url.pathname === '/') {
    console.log(res);
    res.writeHead(200,{
      'content-Type': 'text/plain'
    });
    console.log(res);
    res.end('hello from my server!');
  }

});

server.listen(PORT, function() {
  console.log('server up:', PORT);
});
