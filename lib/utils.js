'use strict';
/**
 * Utilities
 * @module utils
 */

var util = require('util');

exports.UUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;

exports.isArray = util.isArray;
exports.nop = function() {};

/**
 * Return a value only if UUID format
 *
 * @param  {String} val Input string
 */
exports.toUUID = function(val) {
  if (!val || typeof val !== 'string') return null;

  val = val.substr(val.lastIndexOf('/') + 1); // omit the prefix
  if (val.match(exports.UUID)) return val;
  else return null;
};

/**
 * Debug function
 *
 * @param {String} val Text value to debug
 */
exports.debug = function(val) {
  if (process.env.LAYER_API_DEBUG !== 'true') return;
  console.log('[LayerAPI] ' + val);
};

/**
 * Error messages
 */
exports.i18n = {
  layerapi: {
    token: 'You need to pass a valid `token` to constructor',
    appId: 'You need to pass a valid `appId` to constructor',
    agent: 'Constructor option `agent` needs to be an instance of https.Agent',
  },
  webhooks: {
    url: 'URL to your service is required',
    events: 'Event Names to listen for are required',
    secret: 'Secret is required for a webhook',
  },
};
