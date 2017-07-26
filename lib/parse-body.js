'use strict';

module.exports = function(req, callback){
  req.body = '';
  req.on('data', function(data){
    req.body += data.toString();
  });

  req.on('end', function(){
    try{
      console.log('heres a req body', req.body);
      req.body = JSON.parse(req.body);
      callback(null, req.body);
    } catch(err){
      callback(err);
    }
  });
};
