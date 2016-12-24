import '../../dirtyShould';
import Url from '../../../src/common/Url';
import {StringMap, PriorityMap} from '../../../src/popup/smartKeyword/PriorityMap';

describe('StringMap', () => {
  describe('set', () => {
    it('should set values in map', () => {
      let m = new StringMap();
      m.set('s', 4);
      m.map.should.eql({s: {val: 4}});
    });
    it('should be case insensitive', () => {
      let m = new StringMap();
      m.set('s', 4);
      m.set('S', 5);
      m.map.should.eql({s: {val: 5}});
    });
    it('should save the origin key as it last seted', () => {
      let m = new StringMap();
      m.set('sE', 4);
      m.set('Se', 5);
      m.map.should.eql({se: {val: 5}});
      m.map.se.$originKey.should.equal('Se');
    });
    it('should only accept string as key', () => {
      let m = new StringMap();
      (function(){
        m.set(4)
      }).should.Throw(Error, /key must be a string/);
    });
    it('should throw Error if val undefined', () => {
      let m = new StringMap();
      (() => m.set('3')).should.Throw(Error, /value cannot be undefined/);
    });
  });
  describe('has', () => {
    let m = new StringMap();
    m.set('t', 3);
    it('should be case insensitive', () => {
      m.has('t').should.be.true();
      m.has('T').should.be.true();
    });
    it('should only accept string as argument', () => {
      (() => m.has(4)).should.Throw(Error, /key must be a string/);
    });
  });
  describe('get', () => {
    let m = new StringMap();
    m.set('t', 5);
    it('should return undefined if not exist', () => {
      (m.get('e') === undefined).should.be.true();
    });
    it('should be case insensitive', () => {
      m.get('T').should.equal(5);
    });
    it('should only accept string as argument', () => {
      (() => m.get(4)).should.Throw(Error, /key must be a string/);
    });
  });
  describe('clear', () => {
    it('should clear all', () => {
      let m = new StringMap();
      m.set('t', 4);
      m.clear();
      m.map.should.eql({});
    });
  });
  describe('iterability', () => {
    // it('should')
    it('should iterable', () => {
      let m = new StringMap();
      m.set('1', 1);
      m.set('2', 2);
      m.set('3', 3);
      let values = [];
      for(let v of m) {
        values.push(v);
      }
      values.should.eql([['1', 1], ['2', 2], ['3', 3]]);
    });
    it('return key should be originKey', () => {
      let m = new StringMap();
      m.set('t', 1);
      m.set('T', 2);
      m.set('TEST', 3);
      let values = [];
      for(let v of m) {
        values.push(v);
      }
      values.should.eql([['T', 2], ['TEST', 3]]);
    });
  });
});

describe('PriorityMap', () => {
  describe('construct', () => {
    describe('initialize', () => {
      it('should initialize .map', () => {
        let url = new Url('https://google.com/search?q=regex+english&safe=off#newwindow=1&safe=off&q=regex');
        let pm = new PriorityMap(url);
        pm.map.should.be.instanceof(StringMap);
        [...pm.map].should.be.eql([]);
        [...pm.siteKeywords].should.be.eql([['google', pm.confidence.site]]);
        [...pm.vipWords].should.be.eql([]);
      });
    });
    describe('setSiteKeywords', () => {
      it('should not add last part of host', () => {
        let url = new Url('https://www.google.com');
        let pm = new PriorityMap(url);
        [...pm.siteKeywords].map((item) => item[0]).should.not.include('com');
      });
      it('should not add blacklist words', () => {
        let url = new Url('https://www.not.vs.google.com');
        let pm = new PriorityMap(url);
        let addedWords = [...pm.siteKeywords].map((item) => item[0]);
        addedWords.should.not.include('www');
        addedWords.should.not.include('not');
        addedWords.should.not.include('vs');
      });
      it('should be case-insensitive', () => {
        let url = new Url('https://www.Google.google.com');
        let pm = new PriorityMap(url);
        [...pm.siteKeywords].map((item) => item[0]).should.eql(['google']);
      });
    });
  });
  describe('addVipWords', () => {
    let url = new Url('https://www.google.com');
    let pm = new PriorityMap(url);
    afterEach(() => {
      pm.vipWords.clear();
    });
    it('should add to vipWords', () => {
      pm.addVipWords('test');
      [...pm.vipWords].should.eql([['test', pm.confidence.vip]]);
    });
    it('should accept customized priority', () => {
      pm.addVipWords('test', 4 * pm.confidence.base);
      [...pm.vipWords].should.eql([['test', 4 * pm.confidence.base]]);
    });
    it('should be case-insensitive', () => {
      pm.addVipWords('Test');
      pm.addVipWords('test');
      [...pm.vipWords].map(group => group[0]).should.eql(['test']);
    });
    it('should ignore blacklist words and siteKeywords', () => {
      pm.addVipWords('google');
      pm.addVipWords('Google');
      pm.addVipWords('not');
      pm.addVipWords('vs');
      [...pm.vipWords].should.eql([]);
    });
    it('should increase confidence if word already exist', () => {
      pm.addVipWords('Test');
      pm.addVipWords('test');
      [...pm.vipWords].should.eql([['test', pm.confidence.vip * 2]]);
    });
  });
  describe('vipArray', () => {
    let url = new Url('https://www.google.com');
    let pm = new PriorityMap(url);
    afterEach(() => {
      pm.vipWords.clear();
    });
    it('should return an empty array if no added words', () => {
      pm.vipArray.should.eql([]);
    });
    it('should be ordered array of vipWords', () => {
      pm.addVipWords('test');
      pm.addVipWords('test');
      pm.addVipWords('test');
      pm.addVipWords('test1');
      pm.addVipWords('test1');
      pm.addVipWords('test2');
      pm.vipArray.should.eql([
        {word: 'test', confidence: 3 * pm.confidence.vip},
        {word: 'test1', confidence: 2 * pm.confidence.vip},
        {word: 'test2', confidence: pm.confidence.vip}
      ]);
    });
  });
  describe('increaseConfidence', () => {
    let url = new Url('https://www.google.com');
    let pm = new PriorityMap(url);
    afterEach(() => {
      pm.map.clear();
      pm.vipWords.clear();
    });
    it('should added to map', () => {
      pm.increaseConfidence('test');
      [...pm.map].should.eql([['test', pm.confidence.base]]);
    });
    it('should accept customized priority', () => {
      pm.increaseConfidence('test', 4 * pm.confidence.base);
      [...pm.map].should.eql([['test', 4 * pm.confidence.base]]);
    });
    it('should be case-insensitive', () => {
      pm.increaseConfidence('Test');
      pm.increaseConfidence('test');
      [...pm.map].map(group => group[0]).should.eql(['test']);
    });
    it('should ignore blacklist words', () => {
      pm.increaseConfidence('not');
      [...pm.map].should.eql([]);
    });
    it('should use siteWord\'s priority to increase if adding word exist in siteWords', () => {
      let originPriority = 8;
      pm.map.set('google', originPriority);
      pm.increaseConfidence('google');
      [...pm.map].should.eql([['google', originPriority + pm.siteKeywords.get('google')]]);
    });
    it('should based on vipWord\'s priority to add if adding NEW word exist in vipWords', () => {
      pm.addVipWords('test', 5);
      pm.increaseConfidence('test');
      [...pm.map].should.eql([['test', 5 + pm.confidence.base]]);
    });
    it('should increase priority if adding word already exist in map', () => {
      pm.increaseConfidence('test');
      pm.increaseConfidence('test');
      [...pm.map].should.eql([['test', pm.confidence.base * 2]]);
    });
    it('should save word as it lastest seted', () => {
      pm.increaseConfidence('TEST');
      pm.increaseConfidence('test');
      pm.increaseConfidence('tESt');
      [...pm.map].map(group => group[0]).should.eql(['tESt']);
    });
  });
  describe('orderedArray', () => {
    let url = new Url('https://www.google.com');
    let pm = new PriorityMap(url);
    afterEach(() => {
      pm.map.clear();
      pm.vipWords.clear();
    });
    it('should return an empty array if no added words', () => {
        pm.orderedArray.should.eql([]);
    });
    it('should be ordered array of added words', () => {
      pm.increaseConfidence('test');
      pm.increaseConfidence('test');
      pm.increaseConfidence('test');
      pm.increaseConfidence('test1');
      pm.increaseConfidence('test1');
      pm.increaseConfidence('test2');
      pm.orderedArray.should.eql([
        {word: 'test', confidence: 3 * pm.confidence.base},
        {word: 'test1', confidence: 2 * pm.confidence.base},
        {word: 'test2', confidence: pm.confidence.base}
      ]);
    });
  });
  describe('clear', () => {
    it('should clear map', () => {
      let url = new Url('https://www.google.com');
      let pm = new PriorityMap(url);
      pm.increaseConfidence('test');
      pm.clear();
      pm.map.size.should.equal(0);
    });
  });

});