/**
 * Created by ray7551@gmail.com on 12.06 006.
 */
const chai  = require('chai');
const dirtyChai = require('dirty-chai');
import {isEmpty, filterEmptyStr} from '../src/common/base';

chai.config.includeStack = true;
chai.use(dirtyChai);
var should = chai.should();

describe('util', function () {
  describe('isEmpty', function () {
    it('should return true if empty', function () {
      isEmpty().should.be.true();
      isEmpty(void 0).should.be.true();
      isEmpty(null).should.be.true();
      isEmpty(undefined).should.be.true();
      isEmpty([]).should.be.true();
      isEmpty([undefined]).should.be.true();
      isEmpty([undefined, [null]]).should.be.true();
      isEmpty({}).should.be.true();
      isEmpty({length: 0}).should.be.true();
    });
    it('should return false if not empty', function () {
      isEmpty('').should.be.false();
      isEmpty(0).should.be.false();
      isEmpty(['']).should.be.false();
    });
  });

  describe('filterEmptyStr', function () {
    it('should trim string', function () {
      filterEmptyStr('   a ').should.equal('a');
      filterEmptyStr(['   a ']).should.deep.equal(['a']);
    });
    it('should filter empty string', function () {
      filterEmptyStr('    ').should.equal('');
      filterEmptyStr(['    ', '']).should.deep.equal([]);
    });
  });
});