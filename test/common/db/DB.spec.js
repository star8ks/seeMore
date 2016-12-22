import DB from '../../../src/common/db/DB';
import localforage from '../../../src/common/localforage-bluebird';

const expect = require('chai').expect;

/**
 * Created by ray7551@gmail.com on 16-10-27.
 */
describe('DB', function() {
  'use strict';
  var store = new DB(localforage, 'test');

  beforeEach(function(done) {
    store.lf.ready().then(function() {
      return store.lf.clear();
    }).then(function () {
      done();
    });
  });

  it('has some API', function() {
    expect(DB.array).to.be.a('function');
    expect(DB.assoc).to.be.a('function');
    expect(store.get).to.be.a('function');
    expect(store.getAll).to.be.a('function');
    expect(store.set).to.be.a('function');
    expect(store.clear).to.be.a('function');
    expect(store.keys).to.be.a('function');
  });
  it('config localforage driver', function () {
    expect(store.lf._driver).to.equal('localStorageWrapper');
  });

  describe('DB.assoc', function () {

  });

  describe('DB.array', function () {

  });

  describe('set', function () {
    it('should set objects', function () {
      var obj = {
        num: 1,
        str: 'str',
        arr: [1,2,3],
        obj: {key: 'val'}
      };

      return store.set('o', obj).then(function () {
        // must get it within set's then(), or the data will be cleared by beforeEach
        return store.get('o');
      }).then(function (val) {
        expect(val).to.eql(obj);
      });
    }, 500);
  });

  describe('get', function () {
    it('should return a Promise', function() {
      expect(typeof store.get('o').then).to.eql('function');
    });
    it('should get null if key not exist', function() {
      return store.get('o').then(function (val) {
        expect(val === null).to.equal(true);
      });
    }, 500);
    describe('with inner key', function () {
      it('should return an object with $$key(get an object)', function () {
        return store.set('google', {id: 1, order: 1}).then(function () {
          return store.get('google', true);
        }).then(function (engine) {
          var google = Object.defineProperty({id: 1, order: 1}, '$$key', {
            value: 'google',
            enumerable: false
          });
          expect(engine).to.eql(google);
          expect(engine['$$key']).to.eql(google['$$key']);
        });
      });
      it('should return an object with $$key(get a number)', function () {
        return store.set('google', 1).then(function () {
          return store.get('google', true);
        }).then(function (engine) {
          var google = Object.defineProperty({google: 1}, '$$key', {
            value: 'google',
            enumerable: false
          });
          expect(engine).to.eql(google);
          expect(engine['$$key']).to.eql(google['$$key']);
        });
      });
      it('should return an object with $$key(get a string)', function () {
        return store.set('google', 'google is good').then(function () {
          return store.get('google', true);
        }).then(function (engine) {
          var google = Object.defineProperty({google: 'google is good'}, '$$key', {
            value: 'google',
            enumerable: false
          });
          expect(engine).to.eql(google);
          expect(engine['$$key']).to.eql(google['$$key']);
        });
      });
      it('should throw an Error if get by a not exist key', function () {
        return store.get('not-exist', true).catch(function (err) {
          expect(err.toString()).to.equal('Error: Can not define inner key of null or undefined');
        });
      });
    });
  });

  describe('getAll', function () {

  });

  describe('clear', function () {
    it('should remove everything', function () {
      return store.set('1', '11').then(function () {
        return store.set('2', '22');
      }).then(function () {
        return store.clear();
      }).then(function () {
        return store.lf.length();
      }).then(function (length) {
        expect(length).to.equal(0);
      });
    });
  });

  describe('keys', function () {
    it('should return all keys', function () {
      return store.keys().then(function (keys) {
        expect(keys).to.eql([]);
        return store.set('a', 1);
      }).then(function () {
        return store.set('b', 2);
      }).then(function () {
        return store.keys();
      }).then(function (keys) {
        expect(keys).to.eql(['a', 'b']);
      });
    });
  });
});
