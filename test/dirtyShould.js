import * as chai from 'chai';
import dirtyChai from 'dirty-chai';

chai.use(dirtyChai);
chai.config.includeStack = true;
// let assert = chai.assert;
chai.should(); // Modifies `Object.prototype`

export {chai};