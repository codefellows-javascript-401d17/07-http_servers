'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const myParse = require('./lib/myParse.js');
const PORT = process.env.PORT || 3000;

console.log(cowsay.list.toString());

const postMethod = (req, callback) => {
    parseBody(req, (err) => {
        if(err) return console.error(err);
        callback(req)
    })
}

const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);
    console.log('parsed url: ', req.url);
    console.log('unparsed query: ', req.url.query)
    req.url.query = querystring.parse(req.url.query);

     if (req.method === 'POST') postMethod(req.body, 
      (val) => console.log('POST request body: ', req.body))
});