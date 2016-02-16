# Layer Webhook API for node.js
[![Build Status](http://img.shields.io/travis/layerhq/node-layer-webhooks.svg)](https://travis-ci.org/layerhq/node-layer-webhooks)
[![npm version](http://img.shields.io/npm/v/layer-webhooks.svg)](https://npmjs.org/package/layer-webhooks)

A Node.js library, which provides a wrapper for the [Layer](https://layer.com) Webhooks API.

The Layer Webhooks API is a REST API for creating, pausing and deleting Webhooks for notifying your servers of events within your Layer ecosystem.

This library supports requests from your **servers** only.

## Documentation

You can find full documentation on the Webhooks API at [developer.layer.com/docs/webhooks](https://developer.layer.com/docs/webhooks).

## Installation

    npm install layer-webhooks

## Simple example

```javascript
var LayerWebhooks = require('layer-webhooks');

// Initialize by providing your Layer credentials
var layer = new LayerWebhooks({
  token: API_TOKEN,
  appId: APP_ID
});

// Register a webhook
layer.webhooks.register({
  events: ['message.sent'],
  url: 'https://mydomain.com/mywebhooks/messages-sent',
  secret: 'Frodo is a Dodo',
  config: {
    name: 'My sample webhook'
  }
}, function(err, res) {
  if (err) return console.error(err);

  // Webhook registered
});
```

## Initialization

To use this library you need to create a new instance of the `layer-webhooks` module by passing `config` object to a constructor.

### new LayerWebhooks(config)

Layer API constructor is initialized with the following configuration values:

 - `token` - Layer Platform API token which can be obtained from [Developer Dashboard](https://developer.layer.com/projects/keys)
 - `appId` - Layer application ID

*Optional values:*

 - `version` - API version to use (default: `1.0`)
 - `timeout` - Request timeout in milliseconds (default: `10000` milliseconds)
 - `agent` - Instance of [https.Agent](https://nodejs.org/api/https.html#https_class_https_agent) to use HTTPS KeepAlive
 - `agentOptions` - Or use [Agent options](https://nodejs.org/api/http.html#http_new_agent_options) hash directly
 - `debug` - Enable debugging (default: `false`)

## Webhooks

Layer Webhooks API allows you to register webhooks and receive https requests whenever the specified events occur.
Supported webhook events can be seen in [Webhook Events](https://developer.layer.com/docs/webhooks).

### webhooks.get(webhookId, callback)

Retrieve a webhook with the specified ID

##### Arguments

 - `webhookId` - A webhook ID: `layer:///apps/082d4684-0992-11e5-a6c0-1697f925ec7b/webhooks/f5ef2b54-0991-11e5-a6c0-1697f925ec7b`
 - `callback(err, res)` - Callback function returns an error and response objects

##### Examples

```javascript
layer.webhooks.get(webhookId, function(err, res) {
  if (err) return console.error(err);

  // A hook object
  var webhook = res.body;
});
```

---------------------------------------


### webhooks.list(callback)

List all webhooks for your app.

##### Examples

```javascript
layer.webhooks.list(function(err, res) {
  if (err) return console.error(err);

  var webhooks = res.body;
});
```

---------------------------------------

### webhooks.register(options, [callback])

Registers a webhook with Layer's servers.

##### Arguments

 - `options.events` - An array of event types that your service needs.
 - `options.url` - The url to send webhook events to.
 - `options.secret` - An arbitrary string you provide; used to validate that webhook events come from layer's services rather than an unauthorized request on your endpoint.
 - `options.config` - A hash of values (no nested data; string values only) that will be provided with each webhook event sent to your server.
 - `callback(err, res)` - *Optional* Callback function returns an error and response objects

##### Examples

```javascript
layer.webhooks.register({
  events: ['message.sent'],
  url: 'https://mydomain.com/mywebhooks/messages-sent',
  secret: 'Frodo is a Dodo',
  config: {
    name: 'My sample webhook'
  }
}, function(err, res) {
  if (err) return console.error(err);

  // Webhook registered
});
```

---------------------------------------

### webhooks.enable(webhookId, [callback])

Enables a webhook that was previously disabled.

##### Arguments

 - `webhookId` - A webhook ID: `layer:///apps/082d4684-0992-11e5-a6c0-1697f925ec7b/webhooks/f5ef2b54-0991-11e5-a6c0-1697f925ec7b`; this value is provided with each webhook event sent to your server.
 - `callback(err, res)` - *Optional* Callback function returns an error and response objects

##### Examples

```javascript
layer.webhooks.enable(webhookId, function(err, res) {
  if (err) return console.error(err);

  // Webhook enabled
});
```

---------------------------------------

### webhooks.disable(webhookId, [callback])

Disables a webhook that was previously disabled.

##### Arguments

 - `webhookId` - A webhook ID: `layer:///apps/082d4684-0992-11e5-a6c0-1697f925ec7b/webhooks/f5ef2b54-0991-11e5-a6c0-1697f925ec7b`; this value is provided with each webhook event sent to your server.
 - `callback(err, res)` - *Optional* Callback function returns an error and response objects

##### Examples

```javascript
layer.webhooks.disable(webhookId, function(err, res) {
  if (err) return console.error(err);

  // Webhook disabled
});
```

---------------------------------------

### webhooks.delete(webhookId, [callback])

Deletes a webhook that was previously disabled.

##### Arguments

 - `webhookId` - A webhook ID: `layer:///apps/082d4684-0992-11e5-a6c0-1697f925ec7b/webhooks/f5ef2b54-0991-11e5-a6c0-1697f925ec7b`; this value is provided with each webhook event sent to your server.
 - `callback(err, res)` - *Optional* Callback function returns an error and response objects

##### Examples

```javascript
layer.webhooks.delete(webhookId, function(err, res) {
  if (err) return console.error(err);

  // Webhook deleted
});
```

## Promises

All the above functions can be used to return a [promise](https://www.promisejs.org/) by appending the `Async` suffix to the function name e.g.:

```javascript
layer.getAsync({webhookId: myId}).then(function(res) {
  // Webhook description
  var hook = res.body;
}).catch(function(err) {
  console.error(err);
});
```

## Testing

The unit tests are based on the [mocha](https://github.com/mochajs/mocha) module, which may be installed via npm. To run the tests make sure that the npm dependencies are installed by running `npm install` from the project directory.

    npm test

## Contributing

Layer API is an Open Source project maintained by Layer. Feedback and contributions are always welcome and the maintainers try to process patches as quickly as possible. Feel free to open up a Pull Request or Issue on Github.

## Changelog

For a list of version changes please refer to [Github releases](https://github.com/layerhq/node-layer-webhooks/releases) page.
