/**
 * Created by ray7551@gmail.com on 16-10-27.
 */
var DB = (function () {
  /**
   * @param {LocalForage} localforage
   * @param {String} storeName
   * @param {String} name
   * */
  function DB(localforage, storeName, name) {
    storeName = storeName || 'app';
    name = name || 'localforage';
    this.lf = localforage.createInstance({
      driver: localforage.INDEXEDDB,
      name: name,
      storeName: storeName
    });
  }
  /**
   * array to assoc object
   * */
  DB.assoc = function (array, key) {
    var res = {};
    key = key||'$$key';
    array.forEach(function (item) {
      if(item[key]) {
        res[item[key]] = item;
      }
    });
    return res;
  };
  /**
   * assoc object to array
   * */
  DB.array = function (assocObj) {
    var res = [];
    Object.keys(assocObj).forEach(function (key) {
      defineInnerKey(assocObj[key], key);
      res.push(assocObj[key]);
    });
    return res;
  };
  function defineInnerKey(obj, key, keyName) {
    keyName = keyName||'$$key';
    if(typeof obj === 'object' && obj !== null && !obj.hasOwnProperty('$$key')) {
      Object.defineProperty(obj, keyName, {
        get: function () {
          return key;
        },
        enumerable: false
      });
    }
  }

  DB.prototype = {
      get: function(key, withInnerKey) {
        withInnerKey = !!withInnerKey;
        return this.lf.getItem(key).then(function(result) {
          if (withInnerKey && typeof result === 'object' && result!==null) {
            defineInnerKey(result, key);
          }
          return result;
        });
      },

      set: function (key, val) {
        return this.lf.setItem(key, val);
      },
      clear: function () {
        return this.lf.clear();
      },
      keys: function () {
        return this.lf.keys();
      }
  };
  return DB;
})();

var Setting = new DB(localforage, 'setting');
var Icon = new DB(localforage, 'icon');
var Engine = new DB(localforage, 'engine');
/**
 * @param {Boolean} [assoc=false] if resolve a assoc object
 * @return {Promise}
 * */
Engine.getAll = function (assoc) {
  assoc = assoc===undefined ? false : !!assoc;
  return this.keys().map(function(key) {
    return this.get(key, true);
  }.bind(this)).then(function (engines){
    return assoc ? DB.assoc(engines) : engines;
  }).catch(function (err) {
    throw new Error('Error in engine.getAll: ', err);
  });
};
/**
 * @param {Boolean} [assoc=false] if resolve a assoc object
 * @return {Promise}
 * */
Engine.getOpen = function (assoc) {
  assoc = assoc===undefined ? false : !!assoc;
  return this.keys().map(function(key) {
    return this.get(key, true);
  }.bind(this)).then(function (engines){
    var openEngines = engines.filter(function(engine) {
      return engine.open;
    });
    return assoc ? DB.assoc(openEngines) : openEngines;
  }).catch(function (err) {
    throw new Error('Error in engine.getOpen: ', err);
  });
};