'use strict';

module.exports = function(req, callback) {
  var tempBody = '';

  req.on('data', function(data) {
    req.body += data.toString();
  });

  req.on('end', function() {
    if(!tempBody) {
      return callback(new Error('not shit'));
    }
    try {
      req.body = JSON.parse(req.body);
      callback(null, req.body);
    } catch(err) {
      callback(err);
    }
  });
};



