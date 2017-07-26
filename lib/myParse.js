'use strict';

const myParse = (request, callback) => {
  request.body = '';

  request.on('data', function(data) {
    request.body += data.toString();
  });

  request.on('end', function() {
    try {
      request.body = JSON.parse(request.body);
      callback(null, request.body);
    } catch (err) {
      callback(err);
   }
  });
} 

module.exports = myParse;