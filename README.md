# node-posterous
A NodeJS library for working with the posterous API.

## Installation
(Not working yet)

`npm install posterous`

## Usage
Create the Posterous object with a posterous username/password to start using the API methods.

Then call the `auth` method to fetch the user's API token.

    var Posterous = require('posterous');

    var posterous = new Posterous('user', 'pass');
    posterous.auth(function (err, result) {
      if (err) {
        console.error('Could not fetch API token!');
      }

      //API token fetched, you can now use all the API methods!
    });

## Methods
`get(api name, [args,] options, callback)`

This makes GET request to the API endpoint specified by `api name`.

Some API endpoints require arguments such as a site ID, or post ID, and these should be passed as the parameters after the api name.

The `options` parameter is used for POST and PUT requests, where you will want to include body data. For more info on which options are available to each type of request, see the [Posterous API docs](http://posterous.com/api).

The callback function will be used to return error messages or request results.

The same applies to the following functions for different request methods:

`post(api name, [args,] options, callback)`

`put(api name, [args,] options, callback)`

`del(api name, [args,] options, callback)`

### auth(callback)
`auth` will fetch the API token and save it to the Posterous object for future method calls. After you call auth, you don't need to do anything yourself with the API token.

The callback for `auth` is slightly different: `result` will contain the API token directly as a string.

__auth should be called before any other API requests, except for public APIs.__


## Callbacks
All API methods have the same callback:

`err` - contains the error message if there was an error, or null otherwise.

`results` - contains the results of the API call, see the [Posterous API](http://posterous.com/api) for more info.


# APIs
## User (GET)
Get the current user's information.

## Users (POST)
Create a new user (only for platform users of Posterous).

## Subscriptions (GET)
The user's current subscriptions.

## SubscriptionPosts (GET)
The posts from the user's subscribed sites.

## Sites (GET, POST)
List the user's Posterous sites, or create new sites.

## Site (GET, PUT, DELETE)
__Args:__ site ID
Get a single Posterous site, update it, or delete it.

## Photos (GET)
__Args:__ site ID
Get 20 random photos from the user's sites.

## Subscribe (GET)
__Args:__ site ID
Subscribe the current user to a site.

## Unsubscribe (GET)
__Args:__ site ID
Unsubscribe the current user from a site.

## HeaderImage (POST, DELETE)
__Args:__ site ID
Upload a new header image, or delete it.

## SiteProfile (GET, POST, PUT, DELETE)
__Args:__ site ID
Get, create, update, delete a site's profile.

## SiteProfileImage (PUT, DELETE)
__Args:__ site ID
Upload or delete a site's profile image.

## Tags (GET)
__Args:__ site ID
Get the list of tags for a site.

## Contributors (GET, POST)
__Args:__ site ID
Get the list of contributors, or add a new contributor.

## Contributor (DELETE)
__Args:__ site ID, contributor ID
Delete a contributor from a site.

## Subscribers (GET, POST)
__Args:__ site ID
Get a list of subscribers to a site, or add a new subscriber (Platform users only).

## Subscriber (DELETE)
__Args:__ site ID, subscriber ID
Remove a subscriber from a site.

## ExternalSites (GET)
__Args:__ site ID
Get a list of external autopost sites.

## ExternalSite (GET, DELETE)
__Args:__ site ID, external site ID
Get or delete a single external autopost site.

## Theme (GET, POST)
__Args:__ site ID
Get the theme for a site, or create a new theme.

## AllPosts (GET)
Get a list of public posts.

## Posts (GET, POST)
__Args:__ site ID
Get a list of posts belonging to a site, or create a new post.

## PublicPosts (GET)
__Args:__ site ID
Get a list of a site's public posts.

## Post (GET, PUT, DELETE)
__Args:__ site ID, post ID
Get a single post, update it or delete it.

## PostPhotos (GET)
__Args:__ site ID, post ID
Get photos from a post.

## PostVideos (GET)
__Args:__ site ID, post ID
Get videos from a post.

## PostAudioFiles (GET)
__Args:__ site ID, post ID
Get audo files from a post.

## Comments (GET, POST)
__Args:__ site ID, post ID
Get a list of comments from a post, or create a new comment.

## Comment (GET, PUT, DELETE)
__Args:__ site ID, post ID, comment ID
Get a single comment from a post, update it, or delete it.

## Likes (GET, POST)
__Args:__ site ID, post ID
Get a list of likes for a post, or add a new like.

## Like (GET, DELETE)
__Args:__ site ID, post ID, like ID
Get a single like for a post, or delete it.
