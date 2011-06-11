var Posterous = require('../index');
var config = require('./config');

module.exports['Subscribed Sites'] = function(test) {
  var posterous = new Posterous(config.user, config.pass);

  console.log('Fetching api token...');
  posterous.auth(function(err, result) {
    if (err) {
      test.ok(!err, 'Could not get api token, check your username/password in config/index.js');
    }

    console.log('Fetching page 1 of subscriptions...');
    posterous.getSubscriptions(function(err, result) {
      test.ok(!err, 'An error occurred: ' + err);

      test.ok(result, 'Could not retrieve the user\'s subscriptions');

      console.log('Fetching page 2 of subscriptions...');
      posterous.getSubscriptions(2, function(err, result) {
        test.ok(!err, 'An error occurred: ' + err);

        test.ok(result, 'Coudl not retrieve page 2 of subscriptions');

        test.done();
      });
    });
  });
};

module.exports['Subscription Posts'] = function(test) {
  var posterous = new Posterous(config.user, config.pass);

  console.log('Fetching api token...');
  posterous.auth(function(err, result) {
    if (err) {
      test.ok(!err, 'Could not get api token, check your username/password in config/index.js');
    }

    console.log('Fetching page 1 of subscription posts...');
    posterous.getSubscriptionPosts(function(err, result) {
      test.ok(!err, 'An error occurred: ' + err);

      test.ok(result, 'Could not retrieve page 1 of subscription posts');

      console.log('Fetching page 2 of subscription posts...');
      posterous.getSubscriptionPosts(2, function(err, result) {
        test.ok(!err, 'An error occurred: ' + err);

        test.ok(result, 'Could not retrieve page 2 of posts');

        test.done();
      });
    });
  });
};
