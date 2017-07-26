'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/body-parser.js');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if (req.method === 'POST') {
    parseBody(req, function(err) {
      if (err) return console.error(err);
      console.log('POST request body:', req.body);
    });
  }

  if (req.url.pathname === '/') {
    res.writeHead(200, 'good to go', {
      'Content-Type': 'text-plain'
    });
    res.end('welcome to my server!');
  }

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    let params = req.url.query;

    if(!params.text) {
      res.writeHead(400, {
        'Content-type': 'text-plain'
      });

      res.write(cowsay.say({
        text: 'bad request'
      }));
      console.log('req', req);
      res.end();
    } else {
      res.writeHead(200, {
        'Content-type': 'text-plain'
      });

      res.write(cowsay.say({
        text: params.text
      }));
      res.end();
    }
  }

  if (req.method === 'POST' && req.url.pathname === '/cowsay') {
    let params = req.url.query;

    parseBody(req, function(err) {
      console.log('POST request body:', req.body);

      if(!params.text) {
        res.writeHead(400, {
          'Content-type': 'text-plain'
        });

        res.write(cowsay.say({
          text: 'bad request'
        }));
        console.log('req', req);
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
});

server.listen(PORT, function() {
  console.log('server up:', PORT);
});
