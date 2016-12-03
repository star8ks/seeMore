import DB from './DB';
import localforage from '../localforage-bluebird';

let Setting = new DB(localforage, 'setting');
export default Setting;