import * as chai from 'chai';
import DB from '../../../src/common/db/DB';
import Engine from '../../../src/common/db/Engine';
import CONFIG from '../../../src/common/config.test';

var expect = chai.expect;
chai.config.includeStack = true;

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
    it('should lower case all hosts', function () {
      return Engine.get('google').then(function (engine) {
        expect(engine.hosts).to.eql(CONFIG.engines.google.hosts.map(function (host) {
          return host.toLowerCase();
        }));
      });
    })
  });

  describe('getSortedAll', function () {
    it('should return assoc object', function () {
      return Engine.getSortedAll(true).then(function (engines) {
        expect(engines).to.eql(CONFIG.engines);
      });
    });
    it('should return array', function () {
      return Engine.getSortedAll().then(function (engines) {
        expect(DB.assoc(engines)).to.eql(CONFIG.engines);
      });
    });
  });
  describe('getOpen', function () {
    var openEngines = DB.array(CONFIG.engines).filter(function (engine) {
      return engine.open;
    });
    it('should return assoc object', function () {
      return Engine.getOpen(true).then(function (engines) {
        expect(engines).to.eql(DB.assoc(openEngines));
      });
    });
    it('should return array', function () {
      return Engine.getOpen().then(function (engines) {
        expect(DB.assoc(engines)).to.eql(DB.assoc(openEngines));
      });
    });
  });

  describe('searchKeys', function () {
    it('should compare host case insensitively', function () {
      return Engine.searchKeys('www.Google.com').then(function (keys) {
        expect(keys).to.eql(['google']);
      });
    });
    it('should return an empty array if not found', function () {
      return Engine.searchKeys('www.3140.com').then(function (keys) {
        expect(keys).to.eql([]);
      });
    });
    it('can find in root domains', () => {
      return Engine.searchKeys('baidu.com', true).then(keys => {
        expect(keys).to.eql(['baidu']);
      });
    });
    it('should support search all', () => {
      return Engine.searchKeys('www.so.com', true, true).then(keys => {
        expect(keys).to.eql(['360']);
      });
    });
  });
});