/**
 * Created by ray7551@gmail.com on 16-10-27.
 */
class DB {
  /**
   * @param {LocalForage} localforage
   * @param {String} storeName
   * @param {String} name
   * */
  constructor(localforage, storeName='app', name='sc') {
    this.lf = localforage.createInstance({
      // driver: localforage.INDEXEDDB, // too slow!
      driver: localforage.LOCALSTORAGE,
      name: name,
      storeName: storeName
    });
  }

  /**
   * @param key
   * @param withInnerKey
   * @return {Promise}
   */
  get(key, withInnerKey) {
    withInnerKey = withInnerKey === void 0 ? false : !!withInnerKey;
    return this.lf.getItem(key).then(function (item) {
      return withInnerKey ? _defineInnerKey(item, key) : item;
    });
  }

  getAll(withInnerKey, filter) {
    withInnerKey = withInnerKey === void 0 ? false : !!withInnerKey;
    return this.keys().map(function (key) {
      return this.get(key, withInnerKey);
    }.bind(this)).then(function (items) {
      return filter ? items.filter(filter) : items;
    });
  }

  set(key, val) {
    return this.lf.setItem(key, val);
  }

  clear() {
    return this.lf.clear();
  }

  keys() {
    return this.lf.keys();
  }

  /**
   * array to assoc object
   * */
  static assoc(array, key) {
    var res = {};
    key = key || '$$key';
    array.forEach(function (item) {
      if (item[key]) {
        res[item[key]] = item;
      }
    });
    return res;
  }

  /**
   * assoc object to array
   * */
  static array(assocObj) {
    var res = [];
    Object.keys(assocObj).forEach(function (key) {
      _defineInnerKey(assocObj[key], key);
      res.push(assocObj[key]);
    });
    return res;
  }
}

function _defineInnerKey(item, key, keyName) {
  keyName = keyName || '$$key';
  if (item === null || item === void 0) {
    throw new Error('Can not define inner key of null or undefined');
  }

  /* eslint-disable no-unreachable */
  switch (typeof item) {
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
      return _defineInnerKey(obj, key);
      break;
  }
  return item;
}

export default DB;