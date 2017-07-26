'use strict';

const bodyParser = module.exports = (request, callback) => {
  // initalizing the body property
  request.body = '';
  // looking for data keyword and finding it's contents
  request.on('data', (data) => {
    // adding each piece of data to the body property
    request.body += data.toString();
  });
  request.on('end', () => {
    // once request has finished it will try to parse the body property to make it's properties acessible
    try{
      request.body = JSON.parse(request.body);
      // finishing callback loop
      callback(null, request.body);
    } catch(err){
      // if there is a err returning an err
      callback(err);
    }
  });
};
