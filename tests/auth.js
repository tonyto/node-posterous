var Posterous = require('../index');
var config = require('./config');

module.exports['API Token'] = function(test) {
  //To test, add your posterous email/password
  var posterous = new Posterous(config.user, config.pass);

  console.log('Fetching api token...');
  posterous.auth(function(err, result) {
    //Don't expect an error
    test.ok(!err, 'An error occurred: ' + err);

    //Expect a result
    test.ok(result, 'No api token was returned.');
    console.log('API token: ' + result);

    test.done();
  });
};

module.exports['Bad Auth'] = function(test) {
  //Make a bad api token request with no username/password
  var posterous = new Posterous('', '');

  console.log('Fetching api token...');
  posterous.auth(function(err, result) {
    //Expect an error
    test.ok(err);

    //Don't expect a result
    test.ok(!result);

    test.done();
  });
};
