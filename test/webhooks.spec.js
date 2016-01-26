/*globals describe it*/
'use strict';

var should = require('should');
var nock = require('nock');

var fixtures = require('./fixtures.json');
var utils = require('../lib/utils');

var LayerAPI = require('../lib');
var layerAPI = new LayerAPI({token: fixtures.token, appId: fixtures.appId});

describe('Webhook operations', function() {

  describe('Creating a webhook', function() {
    nock('https://api.layer.com')
      .post('/apps/' + fixtures.appId + '/webhooks')
      .times(3)
      .reply(201, fixtures.webhooks.success);

    it('should return a webhook object', function(done) {
      var payload = {
        events: fixtures.webhooks.success.event_types,
        config:     fixtures.webhooks.success.target_config,
        url:        fixtures.webhooks.success.url,
        secret:     fixtures.webhooks.success.secret
      };

      layerAPI.register(payload, function(err, res) {
        should.not.exist(err);
        should.exist(res);

        res.status.should.be.eql(201);
        res.body.should.have.properties(fixtures.webhooks.success);
        done(err);
      });
    });

    it('should return a webhook object - promise', function(done) {
      var payload = {
        events: fixtures.webhooks.success.event_types,
        config:     fixtures.webhooks.success.target_config,
        url:        fixtures.webhooks.success.url,
        secret:     fixtures.webhooks.success.secret
      };
      layerAPI.registerAsync(payload).then(function(res) {
        should.exist(res);

        res.status.should.be.eql(201);
        res.body.should.have.properties(fixtures.webhooks.success);

        done();
      }).catch(function(err) {
        should.not.exist(err);
        done(err);
      });
    });
  });

  describe('Creating a webhook error handling', function() {

    it('should return an error if no url', function(done) {
      layerAPI.register({
        events: fixtures.webhooks.success.event_types,
        config:     fixtures.webhooks.success.target_config,
        secret:     fixtures.webhooks.success.secret
      }, function(err, res) {
        should.exist(err);
        should.not.exist(res);
        err.message.should.be.eql(utils.i18n.webhooks.url);

        done();
      });
    });

    it('should return an error if no events', function(done) {
      layerAPI.register({
        url:        fixtures.webhooks.success.url,
        config:     fixtures.webhooks.success.target_config,
        secret:     fixtures.webhooks.success.secret
      }, function(err, res) {
        should.exist(err);
        should.not.exist(res);

        err.message.should.be.eql(utils.i18n.webhooks.events);

        done();
      });
    });
  });

  describe('Retrieving a webhook by ID', function() {
    nock('https://api.layer.com')
      .get('/apps/' + fixtures.appId + '/webhooks/' + utils.toUUID(fixtures.webhooks.success.id))
      .reply(200, fixtures.webhooks.success);

    it('should return a webhook object', function(done) {
      layerAPI.get(fixtures.webhooks.success.id, function(err, res) {
        should.not.exist(err);
        should.exist(res);

        res.status.should.be.eql(200);
        res.body.should.have.properties(fixtures.webhooks.success);

        done(err);
      });
    });
  });

  describe('Enable a webhook', function() {
    nock('https://api.layer.com')
      .post('/apps/' + fixtures.appId + '/webhooks/' + utils.toUUID(fixtures.webhooks.success.id) + '/activate')
      .reply(201, fixtures.webhooks.success);

    it('should return a webhooks object', function(done) {
      layerAPI.enable(fixtures.webhooks.success.id, function(err, res) {
        should.not.exist(err);
        should.exist(res);

        res.status.should.be.eql(201);
        res.body.should.have.properties(fixtures.webhooks.success);

        done(err);
      });
    });
  });

  describe('Disable a webhook', function() {
    nock('https://api.layer.com')
      .post('/apps/' + fixtures.appId + '/webhooks/' + utils.toUUID(fixtures.webhooks.success.id) + '/deactivate')
      .reply(201, fixtures.webhooks.success);

    it('should return a webhooks object', function(done) {
      layerAPI.disable(fixtures.webhooks.success.id, function(err, res) {
        should.not.exist(err);
        should.exist(res);

        res.status.should.be.eql(201);
        res.body.should.have.properties(fixtures.webhooks.success);

        done(err);
      });
    });
  });

  describe('Delete a webhook', function() {
    nock('https://api.layer.com')
      .delete('/apps/' + fixtures.appId + '/webhooks/' + utils.toUUID(fixtures.webhooks.success.id))
      .reply(204, null);

    it('should return 204', function(done) {
      layerAPI.delete(fixtures.webhooks.success.id, function(err, res) {
        should.not.exist(err);
        should.exist(res);

        res.status.should.be.eql(204);
        res.body.should.not.have.properties(fixtures.webhooks.success);

        done(err);
      });
    });
  });
});