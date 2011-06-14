var http = require('http');
var qs = require('querystring');

var HOST = 'posterous.com';
var PATH = '/api/2/';


var Posterous = function(user, pass) {
  this._auth = 'Basic ' + new Buffer(user + ':' + pass).toString('base64');
  this._token = null;
};


Posterous.prototype.request = function(method, api, args, callback) {
  args = args || {};

  //Add the api token
  if (!("api_token" in args)) {
    args.api_token = this._token;
  }

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

  //Make request to Posterous API
  var req = http.request(reqOptions, function apiRequest(res) {
    //Gather response
    var response = '';
    res.on('data', function apiResponse(d) {
      response += d.toString();
    });

    res.on('end', function endResponse(){
      //Work-around, not all API responses are valid json >_>
      //Example: Deleting a site gives a response of 'undefined:1'
      try {
        var r = JSON.parse(response);

        if (r.error) {
          return callback(r.message || r.error);
        }

        callback(null, r);
      } catch (err) {
        callback(null, {});
      }
    });
  });

  if (body) {
    req.write(body);
  }

  req.on('error', function reqError(e) {
    return callback('Problem with request: ' + e);
  });

  req.end();
};


//Get api token
Posterous.prototype.auth = function getAuthKey(callback) {
  var t = this;

  this.request('GET', 'auth/token', null, function(err, result) {
    if (err) {
      return callback(err);
    }

    //Save api token
    t._token = result.api_token;

    callback(null, result.api_token);
  });
};


//Users
Posterous.prototype.getUser = function getCurrentUser(callback) {
  this.request('GET', 'users/me', null, function(err, result) {
    if (err) {
      return callback(err);
    }

    callback(null, result);
  });
};


//Subscriptions
//getSubscriptions([page number,] callback)
//Use as getSubscriptions(2, callback) for page 2 of subscriptions
//Or getSubscriptions(callback) for page 1 of subcriptions
Posterous.prototype.getSubscriptions = function getSubscriptions(page, callback) {
  if (callback == undefined) {
    callback = page;
    page = 1;
  }

  this.request('GET', 'users/me/subscriptions', {page: page}, function(err, result) {
    if (err) {
      return callback(err);
    }

    callback(null, result);
  });
};

//Subscription posts
//Use the same way as getSubscriptions
Posterous.prototype.getSubscriptionPosts = function getSubscriptionPosts(page, callback) {
  if (callback == undefined) {
    callback = page;
    page = 1;
  }

  this.request('GET', 'users/me/subscriptions/posts', {page: page}, function(err, result) {
    if (err) {
      return callback(err);
    }

    callback(null, result);
  });
};


//Sites
Posterous.prototype.getSites = function getSites(callback) {
  this.request('GET', 'sites', null, function(err, result) {
    if (err) {
      return callback(err);
    }

    callback(null, result);
  });
};

Posterous.prototype.createSite = function createSite(options, callback) {
  this.request('POST', 'sites', options, function(err, result) {
    if (err) {
      return callback(err);
    }

    callback(null, result);
  });
};

Posterous.prototype.getSite = function getSite(id, callback) {
  this.request('GET', 'sites/' + id, null, function(err, result) {
    if (err) {
      return callback(err);
    }

    callback(null, result);
  });
};

Posterous.prototype.updateSite = function updateSite(id, options, callback) {
  this.request('PUT', 'sites/' + id, options, function(err, result) {
    if (err) {
      return callback(err);
    }

    callback(null, result);
  });
};

Posterous.prototype.deleteSite = function deleteSite(id, callback) {
  this.request('DELETE', 'sites/' + id, null, function(err, result) {
    if (err) {
      return callback(err);
    }

    callback(null, result);
  });
};

//Get 20 random photos from a site
//allowed keys for `options` parameter are `page` and `since_id`
Posterous.prototype.getPhotos = function getPhotos(id, options, callback) {
  this.request('GET', 'sites/' + id + '/photos', options, function(err, result) {
    if (err) {
      return callback(err);
    }

    callback(null, result);
  });
};

Posterous.prototype.subscribe = function subscribeTo(id, callback) {
  this.request('PUT', 'sites/' + id + '/subscribe', null, function(err, result) {
    if (err) {
      return callback(err);
    }

    callback(null, result);
  });
};

Posterous.prototype.unsubscribe = function unsubscribeFrom(id, callback) {
  this.request('PUT', 'sites/' + id + '/unsubscribe', null, function(err, result) {
    if (err) {
      return callback(err);
    }

    callback(null, result);
  });
};

Posterous.prototype.setHeader = function setHeader(id, file, callback) {
  this.request('POST', 'sites/' + id + '/header_image', {file: file}, function(err, result) {
    if (err) {
      return callback(err);
    }

    callback(null, result);
  });
};

Posterous.prototype.deleteHeader = function deleteHeader(id, callback) {
  this.request('DELETE', 'sites/' + id + '/header_image', null, function(err, result) {
    if (err) {
      return callback(err);
    }

    callback(null, result);
  });
};

//TODO: Site profile methods


Posterous.prototype.getTags = function getTags(id, callback) {
  this.request('GET', 'sites/' + id + '/tags', null, function(err, result) {
    if (err) {
      return callback(err);
    }

    callback(null, result);
  });
};

//Contributors
Posterous.prototype.getContributors = function getContributors(id, callback) {
  this.request('GET', 'sites/' + id + '/contributors', null, function(err, result) {
    if (err) {
      return callback(err);
    }

    callback(null, result);
  });
};

Posterous.prototype.removeContributor = function removeContributor(id, user, callback) {
  this.request('DELETE', 'sites/' + id + '/contributors/' + user, null, function(err, result) {
    if (err) {
      return callback(err);
    }

    callback(null, result);
  });
};




module.exports = Posterous;
