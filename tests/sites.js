var Posterous = require('../index');
var config = require('./config');

module.exports['Listing Sites'] = function(test) {
  var posterous = new Posterous(config.user, config.pass);

  console.log('Fetching api token...');
  posterous.auth(function(err, result) {
    if (err) {
      test.ok(!err, 'Could not get api token, check yoru username/password in config/index.js');
    }

    console.log('Fetching sites...');
    posterous.getSites(function(err, result) {
      test.ok(!err, 'An error occurred: ' + err);

      test.ok(result, 'Could not retrieve list of sites.');

      if (result[0] && "name" in result[0]) {
        console.log('Site name: ' + result[0].name);
      }

      test.done();
    });
  });
};
