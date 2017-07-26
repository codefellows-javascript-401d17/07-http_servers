'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const myParse = require('./lib/myParse.js');
const PORT = process.env.PORT || 3000;

console.log(cowsay.list.toString());