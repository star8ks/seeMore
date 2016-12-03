import DB from './DB';
import localforage from '../localforage-bluebird';

let Icon = new DB(localforage, 'icon');
export default Icon;