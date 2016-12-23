import DB from './DB';
import localforage from '../localforage-bluebird';

let Engine = new DB(localforage, 'engine');
Engine.set = function (key, engine) {
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
    return se.hosts.includes(host);
  }).then(function (engines) {
    return Object.keys(DB.assoc(engines));
  }).catch(function (err) {
    throw new Error('Error in searchEngineKeys(host = ' + host + '): ' + err);
  });
};

export default Engine;