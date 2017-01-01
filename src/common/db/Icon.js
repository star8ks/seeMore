import DB from './DB';
import localforage from '../localforage-bluebird';
import Url from '../Url';

/**
 * @Why Icon is a DB, but not a field of Engine?
 * Cause technically icon is related to host, and an engine may have many host
 */
let Icon = new DB(localforage, 'icon');

/**
 * search icon by hosts, if not found, fetch favicon from yandex,
 * then transform to dataURI
 * @param {String[]|String} hosts, it should not be an empty array or empty string
 */
Icon.fetch = function (hosts) {
  return Icon.search(hosts).then(url => {
    if(url) {
      return url;
    }
    let faviconUrl = 'http://favicon.yandex.net/favicon/' + hosts[0];
    return Url.toDataURI(faviconUrl);
  });
};

/**
 * search icon by hosts
 * @param {String[]|String} hosts, it should not be an empty array or empty string
 */
Icon.search = function (hosts) {
  if((Array.isArray(hosts) && hosts.length === 0)
    || hosts === '') {
    throw new Error('Icon.search: hosts should not be an empty array or empty string, given: ' + JSON.stringify(hosts));
  }
  hosts = Array.isArray(hosts) ? hosts : [hosts];
  let searchPromises=[];
  for (let host of hosts) {
    searchPromises.push(Icon.get(host.toLowerCase()));
  }
  return Promise.race(searchPromises);
};

export default Icon;