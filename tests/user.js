var Posterous = require('../index');
var config = require('./config');

module.exports['Current User'] = function(test) {
  var posterous = new Posterous(config.user, config.pass);

  console.log('Fetching api token...');
  posterous.auth(function(err, result) {
    if (err) {
      test.ok(!err, 'Could not get api token, check your username/password in config/index.js');
      return test.done();
    }

    console.log('Fetching user details...');
    posterous.get('User', null, function(err, result) {
      test.ok(!err, 'An error occurred: ' + err);

      test.ok(result, 'Did not retrieve user information');

      console.log(result);

      test.done();
    });
  });
};
