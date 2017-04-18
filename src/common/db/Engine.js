import DB from './DB';
import localforage from '../localforage-bluebird';
import Url from '../../common/Url';

let Engine = new DB(localforage, 'engine');
// return data structure
Engine.returnType = {
  assoc: Symbol(),
  normal: Symbol()
};

Engine.set = function (key, engine) {
  // ensure all hosts are lower case
  engine.hosts = engine.hosts.map(function (host) {
    return host.toLowerCase();
  });
  return DB.prototype.set.call(this, key, engine);
};
/**
 * @param {Engine.returnType} [returnType=false] if resolve a assoc object
 * @param {Function?} filter
 * @return {Promise}
 * */
Engine.getSortedAll = function (returnType = Engine.returnType.normal, filter) {
  return this.getAll(true, filter).then(function (engines){
    engines.sort(function (engineA, engineB) {
      return engineA.order - engineB.order;
    });
    return returnType === Engine.returnType.assoc ? DB.assoc(engines) : engines;
  });
};
/**
 * @param {Engine.returnType} [returnType=Engine.returnType.normal] if resolve a assoc object
 * @param {Function?} filter
 * @param {String[]?} fields
 * @return {Promise}
 * */
Engine.getOpen = async function (returnType = Engine.returnType.normal, filter, fields = []) {
  filter = filter || function() {return true;};
  let engines = await this.getAll(true, function(engine) {
    return engine.open && filter(engine);
  });
  var openEngines = engines.sort(function (engineA, engineB) {
    return engineA.order - engineB.order;
  });
  if(fields.length) {
    openEngines = openEngines.map(engine => {
      let obj = {};
      for(let field of fields) {
        obj[field] = engine[field];
      }
      return obj;
    });
  }
  return returnType === Engine.returnType.assoc ? DB.assoc(openEngines) : openEngines;
};

/**
 * @param {String} host A valid host
 * @param {Boolean} [includeRootDomain=false]
 * @param {Boolean} [searchAll=false] it will only search open engine by default
 * @return {Promise}
 * if not found in hosts, next then() will get false,
 * if found, next then() will get the engine keys
 * */
Engine.searchKeys = function(host, {includeRootDomain = false, searchAll = false} = {}) {
  host = host.toLowerCase();

  var p = searchAll ? this.getAll(true) : this.getOpen();
  return p.filter(function (se) {
    if(se.hosts.includes(host)) {
      return true;
    }
    if(!includeRootDomain) {
      return false;
    }
    var inputRootDomain = Url.getRootDomain(host);
    var findHost = se.hosts.find(function (seHost) {
      var seRootDomain = Url.getRootDomain(seHost);
      return seRootDomain === host || seRootDomain === inputRootDomain;
    });
    return findHost !== undefined;
  }).then(function (engines) {
    return Object.keys(DB.assoc(engines));
  });
};

export default Engine;