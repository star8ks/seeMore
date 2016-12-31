import DB from './DB';
import localforage from '../localforage-bluebird';

/**
 * @Why Icon is a DB, but not a field of Engine?
 * Cause technically icon is related to host, and an engine may have many host
 * @type {DB}
 */
let Icon = new DB(localforage, 'icon');
/**
 *
 * @param {[]|String} hosts
 */
Icon.search = function (hosts) {
  hosts = Array.isArray(hosts) ? hosts : [hosts];
  let searchPromises=[];
  for (let host of hosts) {
    searchPromises.push(Icon.get(host));
  }
  return Promise.all(searchPromises);
};

export default Icon;