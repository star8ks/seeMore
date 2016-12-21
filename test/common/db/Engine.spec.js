import DB from '../../../src/common/db/DB';
import Engine from '../../../src/common/db/Engine';
import CONFIG from '../../../src/common/config';

var expect = require('chai').expect;

describe('Engine', function () {
  'use strict';
  // var engine = new DB(localforage, 'test_engine');
  // beforeEach(function (done) {
  //   done();
  // });
  beforeEach(function(done) {
    Engine.lf.ready().then(function() {
      return Engine.lf.clear();
    }).then(function () {
      return Object.keys(CONFIG.engines).map(function (key) {
        return Engine.set(key, CONFIG.engines[key]);
      });
    }).then(function (promises) {
      return Promise.all(promises);
    }).then(function () {
      done();
    });
  });

  describe('set', function () {
    it('should lower case all hosts', function (done) {
      Engine.get('google').then(function (engine) {
        expect(engine.hosts).to.eql(CONFIG.engines.google.hosts.map(function (host) {
          return host.toLowerCase();
        }));
        done();
      });
    })
  });

  describe('getSortedAll', function () {
    it('should return assoc object', function (done) {
      Engine.getSortedAll(true).then(function (engines) {
        expect(engines).to.eql(CONFIG.engines);
        done();
      });
    });
    it('should return array', function (done) {
      Engine.getSortedAll().then(function (engines) {
        expect(DB.assoc(engines)).to.eql(CONFIG.engines);
        done();
      });
    });
  });
  describe('getOpen', function () {
    var openEngines = DB.array(CONFIG.engines).filter(function (engine) {
      return engine.open;
    });
    it('should return assoc object', function (done) {
      Engine.getOpen(true).then(function (engines) {
        expect(engines).to.eql(DB.assoc(openEngines));
        done();
      });
    });
    it('should return array', function (done) {
      Engine.getOpen().then(function (engines) {
        expect(DB.assoc(engines)).to.eql(DB.assoc(openEngines));
        done();
      });
    });
  });

  describe('searchKeys', function () {
    it('should compare host case insensitively', function (done) {
      Engine.searchKeys('www.Google.com').then(function (keys) {
        expect(keys).to.eql(['google']);
        done();
      });
    });
    it('should return an empty array if not found', function (done) {
      Engine.searchKeys('www.3140.com').then(function (keys) {
        expect(keys).to.eql([]);
        done();
      });
    });
  });
});