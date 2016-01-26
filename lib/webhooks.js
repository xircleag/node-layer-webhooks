'use strict';
/**
 * Webhooks resource
 * @module resources/webhooks
 */

var utils = require('./utils');

module.exports = function(request, version) {
  return {

    /**
     * Register a Webhook
     *
     * @param  {Object}   params
     * @param  {String[]} params.events      Array of event names to subscribe to
     * @param  {String}   params.url             URL for webhook events to go to
     * @param  {String}   params.secret          Unique string known only to your server for validating webhook events
     * @param  {Object}   params.config          JSON object to send with all webhook events
     * @param  {Function} callback               Callback function
     */
    register: function(params, callback) {
      if (!params.url) return (callback || function() {})(new Error(utils.i18n.webhooks.url));
      if (!params.events || !params.events.length) return (callback  || function() {})(new Error(utils.i18n.webhooks.events));
      if (!params.secret) return (callback  || function() {})(new Error(utils.i18n.webhooks.secret));

      utils.debug('Webhooks register: ' + params.url);
      request.post({
        path: '/webhooks',
        body: {
          target_url: params.url,
          events: params.events,
          secret: params.secret,
          config: params.config || {},
	  version: version,
        }
      }, function(err, res) {
        if (!err) res.body.secret = params.secret;
        if (callback) callback(err, res);
      });
    },

    /**
     * Disable a webhook
     *
     * @param  {String}   webhookId
     * @param  {Function} callback        Callback function
     */
    disable: function(webhookId, callback) {
      utils.debug('Webhooks disable: ' + webhookId);
      request.post({
        path: '/webhooks/' + utils.toUUID(webhookId) + '/deactivate',
      }, callback || utils.nop);
    },

    /**
     * Enable a webhook
     *
     * @param  {String}   webhookId
     * @param  {Function} callback        Callback function
     */
    enable: function(webhookId, callback) {
      utils.debug('Webhooks enable: ' + webhookId);
      request.post({
        path: '/webhooks/' + utils.toUUID(webhookId) + '/activate',
      }, callback || utils.nop);
    },

    /**
     * Delete a webhook
     *
     * @param  {String}   webhookId
     * @param  {Function} callback        Callback function
     */
    delete: function(webhookId, callback) {
      utils.debug('Webhooks delete: ' + webhookId);
      request.delete({
        path: '/webhooks/' + utils.toUUID(webhookId),
      }, callback || utils.nop);
    },

    /**
     * List all webhooks
     *
     * @param  {Function} callback         Callback function
     */
    list: function(callback) {
      utils.debug('Webhooks list');
      request.get({
        path: '/webhooks',
      }, callback || utils.nop);
    },

    /**
     * Get a webhook
     *
     * @param  {String}   webhookId
     * @param  {Function} callback         Callback function
     */

    get: function(webhookId, callback) {
      utils.debug('Webhooks get: ' + webhookId);
      request.get({
        path: '/webhooks/' + utils.toUUID(webhookId),
      }, callback || utils.nop);
    }
  };
};
