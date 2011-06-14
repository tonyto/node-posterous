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

## Callbacks
All API methods have the same callback:

`err` - contains the error message if there was an error, or null otherwise.

`results` - contains the results of the API call, see the [Posterous API](http://posterous.com/api) for more info.

## Unit tests
First read the `/tests/config/index.sample.js` file and create the config file with a Posterous username/password.

Use nodeunit to run the tests in the `/tests` folder.

Running the tests may create new content in your Posterous account such as sites, posts, etc. Wherever possible, the new content is set to private, and is deleted at the end of the tests.

# API Methods
## Users
### auth(callback)
`auth` will fetch the API token and save it to the Posterous object for future method calls. After you call auth, you don't need to do anything yourself with the API token.

The callback for `auth` is slightly different: `result` will contain the API token directly as a string.

### getUser(callback)
`getUser` retrieves the current user's information, corresponding to the API endpoint of `users/me` in the docs.

## User Subscriptions
### getSubscriptions([page number,] callback)
`getSubscriptions` retrieves a list of the user's current subscriptions, corresponding to the API endpoint of `users/me/subscriptions`.

There is an optional first parameter for specifying the page number of the results.

### getSubscriptionPosts([page number,] callback)
`getSubscriptionPosts` retrieves a list of posts from the user's subscribed sites, corresponding to the API endpoint of `users/me/subscriptions/posts`.

There is an optional first parameter for specifying the page number of the results.

## Sites
### getSites(callback)
`getSites` retrieves a list of the user's Posterous sites, corresponding to the API endpoint of `sites`.

### createSite(options, callback)
`createSite` creates a new Posterous site for the user, corresponding to the API endpoint of `sites`.

The options parameter should be an object corresponding to the options in the docs for this API method:

    {
      'site[hostname]': hostname,
      'site[virtual_host]': virtualhost,
      'site[name]': name,
      'site[is_private]': 'false',
      'site[is_group]': 'false',
      'site[time_zone]': 'UTC',
      'site[subhead]': subhead
    }

**site[hostname]** and **site[name]** are required options.

See the API docs for descriptions of the options.

The result will be in the same format as the data returned by `getSites`.

### getSite(id, callback)
`getSite` fetches the details of a site, specified with the *site id*. This method corresponds to the APi endpoint of `sites/:id`.

### updateSite(id, options, callback)
`updateSite` updates a site's details with the same options as in `createSite`. This method corresponds to the API endpoint `sites/:id`.

### deleteSite(id, callback)
`deleteSite` deletes the Posterous site specified by the *site id*. This method corresponds to the API endpoint `sites/:id`.

### getPhotos(id, options, callback)
`getPhotos` gets 20 random photos from a Posterous specified by the *site id*. This method corresponds to the API endpoint `sites/:id/photos`.

The possible keys in the `options` dictionary are `page` which determines which page of photos to return, and `since_id`, which will restrict photos to those attached to posts after the post with the provided ID. (See API docs for more info)

### subscribe(id, callback)
`subscribe` subscribes the current user to the site specified by the *site id*. This method corresponds to the API endpoint `sites/:id/subscribe`.

### unsubscribe(id, callback)
`unsubscribe` removes the user's subscription to the site specified by the *site id*. This method corresponds to the API endpoint `sites/:id/unsubscribe`.

### setHeader(id, file, callback)
`setHeader` sets a new header image for the site. This method corresponds to the API endpoint `sites/:id/header_image`.

### deleteHeader(id, callback)
`deleteHeader` removes the header image for the site specified by the *site id*. This method corresponds to the API endpoint `sites/:id/header_image`.

## Tags
### getTags(id, callback)
`getTags` retrieves the tags associated with a site. This method corresponds to the API endpoint `sites/:id/tags`.

## Contributors
### getContributors(id, callback)
`getContributors` retrieves the contributors of a Posterous. This method corresponds to the API endpoint `sites/:id/contributors`.

### removeContributor(id, user, callback)
`removeContributor` removes a user (specified by ID) from the list of contributors of a site. This method corresponds to the API endpoint `sites/:id/contributors/:user`.

## Subscribers
### getSubscribers(id, callback)
`getSubscribers` retrieves the subscribers of a Posterous. This method corresponds to the API endpoint `sites/:id/subscribers`.

### removeSubscriber(id, user, callback)
`removeSubscriber` removes a user (specified by ID) from the list of subscribers of a site. This method corresponds to the API endpoint `sites/:id/subscribers/:user`.
