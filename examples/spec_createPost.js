var Posterous = require('../index');
var config = require('./config');

var posterous = new Posterous(config.user, config.pass, config.api_token);

console.log('Fetching user details...');
posterous.post('Posts', 'tonyto85', {post: {title: 'foo bar title', body: 'foo bar body'}}, function(err, result) {
  if(err){
      console.error(err, 'something did not work');
  }

  console.log('%j',result);
});
