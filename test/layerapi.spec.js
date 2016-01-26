/*globals describe it*/
'use strict';

var should = require('should');

var fixtures = require('./fixtures.json');

var utils = require('../lib/utils');
var LayerWebhookAPI = require('../lib');

describe('Layer API constructor', function() {

  describe('Passing config with token and appId', function() {
    it('should expose expected methods', function() {
      var layerWebhookAPI = new LayerWebhookAPI({
        token: fixtures.token, appId: fixtures.appId,
      });
      should.exist(LayerWebhookAPI);

      should(typeof layerWebhookAPI.register).be.eql('function');
      should(typeof layerWebhookAPI.enable).be.eql('function');
      should(typeof layerWebhookAPI.disable).be.eql('function');
      should(typeof layerWebhookAPI.delete).be.eql('function');
      should(typeof layerWebhookAPI.list).be.eql('function');
      should(typeof layerWebhookAPI.listAsync).be.eql('function');
    });
  });

  describe('Passing config with token and full appId', function() {
    it('should not throw an error', function() {
      var layerWebhookAPI = new LayerWebhookAPI({token: fixtures.token, appId: fixtures.appIdFull});
      should.exist(LayerWebhookAPI);
    });
  });

  describe('Passing no config', function() {
    it('should throw an error', function() {
      try {
        new LayerWebhookAPI();
      }
      catch (err) {
        should.exist(err);
        err.message.should.be.eql(utils.i18n.layerapi.token);
      }
    });
  });

  describe('Passing config with token only', function() {
    it('should throw an error', function() {
      try {
        new LayerWebhookAPI({token: fixtures.token});
      }
      catch (err) {
        should.exist(err);
        err.message.should.be.eql(utils.i18n.layerapi.appId);
      }
    });
  });

  describe('Passing config with invalid appId', function() {
    it('should throw an error', function() {
      try {
        new LayerWebhookAPI({token: fixtures.token, appId: '12345'});
      }
      catch (err) {
        should.exist(err);
        err.message.should.be.eql(utils.i18n.layerapi.appId);
      }
    });
  });

  describe('Passing config with invalid agent', function() {
    it('should throw an error', function() {
      try {
        new LayerWebhookAPI({token: fixtures.token, appId: fixtures.appIdFull, agent: 123});
      }
      catch (err) {
        should.exist(err);
        err.message.should.be.eql(utils.i18n.layerapi.agent);
      }
    });
  });
});
