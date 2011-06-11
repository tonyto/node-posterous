var Posterous = require('../index');
var config = require('./config');


function makeid()
{
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 15; i++ )
  text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

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

module.exports['Create, update, retrieve and delete site'] = function(test) {
  //This test is run in four stages:
  //Create a new site
  //Update the new site's name
  //Fetch the new site's details
  //Delete the new site
  //
  //This will test the API methods createSite, updateSite, getSite, and deleteSite
  var posterous = new Posterous(config.user, config.pass);

  console.log('Fetching api token...');
  posterous.auth(function(err, result) {
    if (err) {
      test.ok(!err, 'Could not get api token, check your username/password in config/index.js');
    }

    console.log('Creating new site...');

    //Create new private site with random subdomain and name
    var options = {
      'site[hostname]': makeid(),
      'site[name]': 'unit test stage 1',
      'site[is_private]': 'true'
    };

    posterous.createSite(options, function(err, result) {
      test.ok(!err, 'An error occurred: ' + err);

      test.ok(result, 'Could not create a new site');

      test.equals(result.name, 'unit test stage 1');

      var site_id = result.id;

      console.log('Updating site name...');
      posterous.updateSite(site_id, {'site[name]': 'unit test stage 2'}, function(err, result) {
        test.ok(!err, 'An error occurred: ' + err);

        test.ok(result, 'Could not update site name');

        console.log('Fetching site details...');
        posterous.getSite(site_id, function(err, result) {
          test.ok(!err, 'An error occurred: ' + err);

          test.ok(result, 'Could not fetch site details');

          test.equals(result.id, site_id);
          test.equals(result.name, 'unit test stage 2', 'Site name was not updated.');

          console.log('Deleting site...');
          posterous.deleteSite(site_id, function(err, result) {
            test.ok(!err, 'An error occurred: ' + err);

            test.ok(result, 'Could not delete site');

            test.done();
          });
        });
      });
    });
  });
};
