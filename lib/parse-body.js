'use strict';

module.exports = function(req, callback) {
  let tempBody = '';

  req.on('data', function(data) {
    tempBody += data.toString();
  });

  req.on('end', function() {
    if(!tempBody){
      return callback(new Error('empty body'));
    }
    try {
      let parse = JSON.parse(tempBody);
      req.body = parse;
      callback(null, req.body);
    } catch (err) {
      callback(err);
    }
  });
};
