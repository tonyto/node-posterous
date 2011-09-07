var	Step = require('step')
  , Posterous = require('../index')
	, config = require('./config')
	,	posterous = new Posterous(config.user, config.pass, config.api_token)
	, siteId = config.site;

Step(
  function posting() {
    var postData = {'post[title]' : 'foo bar title', 'post[body]' : 'foo bar body'};
    posterous.post('Posts', siteId, postData, this);
  },
  
  function putting(err, result) {
    if(err)
      return console.error(err);
    
    console.log('successfully posted: ' + result['id']);
    
    var postData = {'post[title]': 'updated to monkey foo bar title', 'post[body]' : 'Updated to magic foo bar body'};    
    posterous.put('Post', siteId, result['id'], postData, this);
  },
  
  function getting(err, result) {
    if(err)
      return console.error(err);
    
    console.log('successfully updated: ' + result['id']);
  
    posterous.get('Post', siteId, result['id'], null, this);
  },
  
  function deleting(err, result) {
    if(err)
      return console.error(err);
    
    console.log('successfully retreived: ' + result['id']);
  
    posterous.del('Post', siteId, result['id'], null, this);
  },
  
  function ending(err, result) {
    if(err)
      return console.error(err);
    
    console.log('successfully deleted');
    console.log(result);
  }
);
