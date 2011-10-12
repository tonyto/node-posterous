var http = require('http')
  , qs = require('querystring')
  , api = require('./api')
  , Rest = require('restler')
  , HOST = 'http://posterous.com'
  , PATH = '/api/2/';

var Posterous = function(user, pass, api_token) {
  this._auth = 'Basic ' + new Buffer(user + ':' + pass).toString('base64');
  this._token = api_token;
};

/*
* Makes a http GET request
* @return {string}
*/
Posterous.prototype.get = function() {
  console.log('about to get');
  this.makeRequest('GET', arguments);
};

/*
* Makes a http POST request
* @return {string}
*/
Posterous.prototype.post = function() {
  this.makeRequest('POST', arguments);
};

/*
* Makes a http PUT request
* @return {string}
*/
Posterous.prototype.put = function() {
  this.makeRequest('PUT', arguments);
};

/*
* Makes a http DELETE request
* @return {string}
*/
Posterous.prototype.del = Posterous.prototype.delete = function() {
  this.makeRequest('DELETE', arguments);
};

/*
* Validates arguments for the given request
* @return callback
*/
Posterous.prototype.makeRequest = function(method, args) {
	var data = validate(args);

  var info = api[data.apiName];
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

  //console.log(method + ' ' + path + ' ' + ' %j', options);
  this.request(method, path, data.options, data.callback);
};

var validate = function(args, callback){
	if (args.length < 3) {
		return console.error('[Posterous] You must pass at least 3 arguments to the method.');
	};
	var apiName = args[0];
	var callback = args[args.length - 1];
	var options = args[args.length - 2];

	if (typeof callback != 'function') {
		return console.error('[Posterous] You must pass a callback function.');
	};

	if (!(apiName in api)) {
		return callback('This API method doesn\'t exist.');
	};

	return {
		'apiName': apiName,
		'callback': callback,
		'options': options
	};

};

/*
 * Makes the http request via Restler
 * @return callback(err, data)
 * */
Posterous.prototype.request = function(method, api, args, callback) {
  args = args || {};
  args.api_token = this._token;

  var reqOptions = {
    host: HOST,
    port: 80,
    method: method,
    path: PATH + api,
    headers: {Authorization: this._auth},
    body: null
  };

  if (method != 'GET') {
		args['_methods'] = method;
    reqOptions.method = method;
    reqOptions.data = args;
  } else {
    reqOptions.path = reqOptions.path + '?' + qs.stringify(args);
  }

  var uri = reqOptions.host + reqOptions.path;

  switch(method){
    case "GET":
      Rest.get(uri, reqOptions, callback).on('complete', function(data) {
        callback(null, data);
      }).on('error', function(data, err) {
        callback(err, data);
      });

      break;
    case "POST":
      console.log('posting via Restler')
      Rest.post(uri, reqOptions, callback).on('complete', function(data) {
        callback(null, data);
      }).on('error', function(data, err) {
        callback(err, data);
      });

      break;
    case "PUT":
      Rest.put(uri, reqOptions, callback).on('complete', function(data) {
        callback(null, data);
      }).on('error', function(data, err) {
        callback(err, data);
      });

      break;
    case "DELETE":
      Rest.del(uri, reqOptions, callback).on('complete', function(data) {
        callback(null, data);
      }).on('error', function(data, err) {
        callback(err, data);
      });

      break;
    default:
      callback(err, "no METHOD was set");
  }
};

module.exports = Posterous;
