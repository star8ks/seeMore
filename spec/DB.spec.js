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
    expect(typeof store.get).toBe('function');
    expect(typeof store.set).toBe('function');
    expect(typeof store.clear).toBe('function');
  });
  it('config localforage driver', function () {
    expect(store.lf._driver).toBe('asyncStorage');
  });

  describe('set', function () {
    it('should set objects', function (done) {
      var obj = {
        num: 1,
        str: 'str',
        arr: [1,2,3],
        obj: {key: 'val'}
      };

      store.set('o', obj).then(function () {
        // must get it within set's then(), or the data will be cleared by beforeEach
        return store.get('o');
      }).then(function (val) {
        expect(val).toEqual(obj);
        done();
      });
    }, 500);
  });

  describe('get', function () {
    it('should return a Promise', function() {
      expect(typeof store.get('o').then).toEqual('function');
    });
    it('should get null if key not exist', function(done) {
      store.get('o').then(function (val) {
        expect(val).toBeNull();
        done();
      });
    }, 500);
  });

  describe('clear', function () {
    it('should remove everything', function (done) {
      store.set('1', '11').then(function () {
        return store.set('2', '22');
      }).then(function () {
        return store.clear();
      }).then(function () {
        return store.lf.length();
      }).then(function (length) {
        expect(length).toBe(0);
        done();
      });
    });
  });

  describe('keys', function () {
    it('should return all keys', function (done) {
      store.keys().then(function (keys) {
        expect(keys).toEqual([]);
        return store.set('a', 1);
      }).then(function () {
        return store.set('b', 2);
      }).then(function () {
        return store.keys();
      }).then(function (keys) {
        expect(keys).toEqual(['a', 'b']);
        done();
      });
    });
  });
});

describe('engine', function () {
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

  describe('getAll', function () {
    it('should return assoc object', function (done) {
      Engine.getAll(true).then(function (engines) {
        expect(engines).toEqual(CONFIG.engines);
        done();
      });
    });
    it('should return array', function (done) {
      Engine.getAll().then(function (engines) {
        expect(DB.assoc(engines)).toEqual(CONFIG.engines);
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
        expect(engines).toEqual(DB.assoc(openEngines));
        done();
      });
    });
    it('should return array', function (done) {
      Engine.getAll().then(function (engines) {
        expect(DB.assoc(engines)).toEqual(CONFIG.engines);
        done();
      });
    });
  })
});