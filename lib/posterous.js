var http = require('http')
  , qs = require('querystring')
  , api = require('./api')
  , Rest = require('../restler/lib/restler');

var HOST = 'http://posterous.com';
var PATH = '/api/2/';


var Posterous = function(user, pass, api_token) {
  this._auth = 'Basic ' + new Buffer(user + ':' + pass).toString('base64');
  this._token = api_token;
};


Posterous.prototype.request = function(method, api, args, callback) {
  args = args || {};
  args['api_token'] = this._token;
  
  //Set up request options
  var path = PATH + api;
  var body = null;
  var headers = {
    Authorization: this._auth
  };

  if (method != 'GET') {
    args['_method'] = method;
    method = 'POST';
    body = qs.stringify(args);
    headers['Content-Length'] = body.length;
  } else {
    path = path + '?' + qs.stringify(args);
  }

  var reqOptions = {
    host: HOST,
    port: 80,
    method: method,
    path: path,
    headers: headers
  };

  console.log('uri args: %j', args);
  console.log('uri path: ' + reqOptions.path);
  console.log('uri headers: %j', reqOptions.headers);
  console.log('uri headers: ' + reqOptions.headers['Authorization']);
  
  //Using restler
  if (method === "GET"){
    console.log('getting something');
    Rest.get(reqOptions.host + reqOptions.path, reqOptions, callback).on('complete', function(data) {

      callback(null, data);
	    
    }).on('error', function(data, err) {
      callback(err, data);
    });
  }
  
};

Posterous.prototype.makeRequest = function(method, args) {
  if (args.length < 3) {
    return console.error('[Posterous] You must pass arguments to the method.');
  }

  var apiName = args[0];
  var callback = args[args.length - 1];
  var options = args[args.length - 2];

  //Check last argument is a callback function
  if (typeof callback != 'function') {
    return console.error('[Posterous] You must pass a callback function.');
  }

  //Check API method name
  if (!(apiName in api)) {
    return callback('This API method doesn\'t exist.');
  }

  var info = api[apiName];
  var path = info.path;

  //Check API method
  if (info.methods.indexOf(method) == -1) {
    return callback('This API method is not allowed.');
  }

  //Check number of arguments
  if ('args' in info) {
    if (args.length - 3 != info.args) {
      return callback('You passed the wrong number of arguments to the method.');
    }

    //Create API path
    for (var i = 1; i < info.args + 1; i++) {
      path = path.replace('{' + (i - 1) + '}', args[i]);
    }
  }

  console.log(method + ' ' + path + ' ' + ' %j', options);

  this.request(method, path, options, callback);
};


Posterous.prototype.get = function() {
  console.log('about to get');
  this.makeRequest('GET', arguments);
};

Posterous.prototype.post = function() {
  this.makeRequest('POST', arguments);
};

Posterous.prototype.put = function() {
  this.makeRequest('PUT', arguments);
};

Posterous.prototype.del = Posterous.prototype.delete = function() {
  this.makeRequest('DELETE', arguments);
};

module.exports = Posterous;
