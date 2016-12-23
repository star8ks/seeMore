import '../dirtyShould';
import {isEmpty, filterEmptyStr, getValueDeep, match} from '../../src/common/base';

describe('util', () => {
  describe('isEmpty', () => {
    it('should return true if empty', () => {
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
    it('should return false if not empty', () => {
      isEmpty(true).should.be.false();
      isEmpty(false).should.be.false();
      isEmpty('').should.be.false();
      isEmpty(0).should.be.false();
      isEmpty(5).should.be.false();
      isEmpty(['']).should.be.false();
      isEmpty({a: ''}).should.be.false();
      isEmpty({a: []}).should.be.false();
    });
    it('should treat empty string as no-empty if set emptyStrIsEmpty true', () => {
      isEmpty('', true).should.be.true();
      isEmpty([''], true).should.be.true();
      isEmpty([[],['']], true).should.be.true();
    });
    it('should treat zero as no-empty if set zeroIsEmpty true', () => {
      isEmpty(0, false, true).should.be.true();
      isEmpty([0], false, true).should.be.true();
      isEmpty([0,[0]], false, true).should.be.true();
    });
  });

  describe('filterEmptyStr', () => {
    it('should trim string', () => {
      filterEmptyStr('   a ').should.equal('a');
      filterEmptyStr(['   a ']).should.deep.equal(['a']);
    });
    it('should filter empty string', () => {
      filterEmptyStr('    ').should.equal('');
      filterEmptyStr(['    ', '']).should.deep.equal([]);
    });
  });

  describe('getValueDeep', () => {
    it('should get origin value of primitive value', () => {
      (getValueDeep() === undefined).should.be.true();
      (getValueDeep(null) === null).should.be.true();
      getValueDeep(true).should.be.true();
      getValueDeep(false).should.be.false();
      getValueDeep(4).should.equal(4);
      getValueDeep('').should.equal('');
    });
    it('should get deep value of object', () => {
      var obj = {a: [3, 4], b: [5, 6], c: {c: [43]}};
      getValueDeep(obj).should.eql([3, 4, 5, 6, 43]);
    });
    it('should get deep value of array', () => {
      var obj = [[3, 4], [[5, 6]], [43, [1, [2, 9]]]];
      getValueDeep(obj).should.eql([3, 4, 5, 6, 43, 1, 2, 9]);
    });
  });

  describe('match', () => {
    describe('no global flag set', () => {
      it('should return array if matched', () => {
        match('a', /a/).should.eql('a'.match(/a/));
        match('a8u', /[\d]/).should.eql('a8u'.match(/[\d]/));
      });
      it('should return null if not matched', () => {
        (match('a', /b/) === null).should.be.true();
      });
    });
    describe('global flat seted', () => {
      describe('have no groups', () => {
        match('ab', /\w/g).should.eql([
          Object.assign(['a'], {index: 0, input: 'ab'}),
          Object.assign(['b'], {index: 1, input: 'ab'})
        ]);
        match('aBaB', /ab/ig).should.eql([
          Object.assign(['aB'], {index: 0, input: 'aBaB'}),
          Object.assign(['aB'], {index: 2, input: 'aBaB'})
        ]);
      });
      describe('have groups', () => {
        match('ab', /(\w)/g).should.eql([
          Object.assign(['a', 'a'], {index: 0, input: 'ab'}),
          Object.assign(['b', 'b'], {index: 1, input: 'ab'})
        ]);
        match('aBAb', /a(b)/ig).should.eql([
          Object.assign(['aB', 'B'], {index: 0, input: 'aBAb'}),
          Object.assign(['Ab', 'b'], {index: 2, input: 'aBAb'})
        ]);
      });
    });
  });
});