var Posterous = require('../index');
var config = require('./config');

var posterous = new Posterous(config.user, config.pass, config.api_token);

console.log('Fetching user details...');
posterous.get('User', null, function(err, result) {
    if(err){
        console.error(err, 'An error occurred: ' + err);
    }

  console.log(result);
});
