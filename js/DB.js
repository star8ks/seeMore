/**
 * Created by ray7551@gmail.com on 16-10-27.
 */
var DB = (function () {
  'use strict';
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
  function defineInnerKey(item, key, keyName) {
    keyName = keyName||'$$key';
    if(item === null || item === void 0) {
      throw new Error('Can not define inner key of null or undefined');
    }
    switch(typeof item) {
      case 'object':
        Object.defineProperty(item, keyName, {
          value: key,
          enumerable: false
        });
        return item;
        break;
      case 'string':
      case 'number':
        var obj = {};
        obj[key] = item;
        return defineInnerKey(obj, key);
        break;
    }
    return item;
  }

  DB.prototype = {
    get: function(key, withInnerKey) {
      withInnerKey = withInnerKey === void 0 ? false : !!withInnerKey;
      return this.lf.getItem(key).then(function(item) {
        return withInnerKey ? defineInnerKey(item, key) : item;
      });
    },
    getAll: function (withInnerKey, filter) {
      withInnerKey = withInnerKey === void 0 ? false : !!withInnerKey;
      return this.keys().map(function(key) {
        return this.get(key, withInnerKey);
      }.bind(this)).then(function (items) {
        return filter ? items.filter(filter) : items;
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
var EngineType = new DB(localforage, 'engineType');
EngineType.getAllDefault = function () {
  return this.getAll(true).then(function (types) {
    return types.filter(function (type) {
      return type.default;
    });
  });
};
EngineType.getAllReal = function () {
  return this.getAll(true).then(function (types) {
    return types.filter(function (type) {
      return !type.default;
    });
  });
};

var Engine = new DB(localforage, 'engine');
Engine.set = function (key, engine) {
  //@TODO do some validation here
  // ensure all hosts are lower case
  engine.hosts = engine.hosts.map(function (host) {
    return host.toLowerCase();
  });
  return DB.prototype.set.call(this, key, engine);
};
/**
 * @param {Boolean} [assoc=false] if resolve a assoc object
 * @param {Function?} filter
 * @return {Promise}
 * */
Engine.getSortedAll = function (assoc, filter) {
  assoc = assoc===void 0 ? false : !!assoc;
  return this.getAll(true, filter).then(function (engines){
    engines.sort(function (engineA, engineB) {
      return engineA.order - engineB.order;
    });
    return assoc ? DB.assoc(engines) : engines;
  }).catch(function (err) {
    throw new Error('Error in engine.getAll: ' + err);
  });
};
/**
 * @param {Boolean} [assoc=false] if resolve a assoc object
 * @param {Function?} filter
 * @return {Promise}
 * */
Engine.getOpen = function (assoc, filter) {
  assoc = assoc===void 0 ? false : !!assoc;
  filter = filter || function(){return true};
  return this.getAll(true, function(engine) {
    return engine.open && filter(engine);
  }).then(function (engines){
    var openEngines = engines.sort(function (engineA, engineB) {
      return engineA.order - engineB.order;
    });
    return assoc ? DB.assoc(openEngines) : openEngines;
  }).catch(function (err) {
    throw new Error('Error in engine.getOpen: ' + err);
  });
};

/**
 * @param {String} host A valid host
 * @return {Promise}
 * if not found in hosts, next then() will get false,
 * if found, next then() will get the engine keys
 * */
Engine.searchKeys = function(host) {
  host = host.toLowerCase();
  return this.getOpen().filter(function (se) {
    //@TODO it should be case insensitive includes here
    return se.hosts.includes(host);
  }).then(function (engines) {
    return Object.keys(DB.assoc(engines));
  }).catch(function (err) {
    throw new Error('Error in searchEngineKeys(host = ' + host + '): ' + err);
  });
};