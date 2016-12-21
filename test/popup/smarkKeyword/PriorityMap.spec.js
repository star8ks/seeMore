const chai  = require('chai');
const dirtyChai = require('dirty-chai');
import Url from '../../../src/common/Url';
import PriorityMap from '../../../src/popup/smartKeyword/PriorityMap';

chai.config.includeStack = true;
chai.use(dirtyChai);
var should = chai.should();

describe('PriorityMap', () => {
  describe('construct', () => {
    describe('initialize', () => {
      it('should initialize .map', () => {
        let url = new Url('https://google.com/search?q=regex+english&safe=off#newwindow=1&safe=off&q=regex');
        let pm = new PriorityMap(url);
        pm.map.should.be.a('Map');
        [...pm.map].should.be.eql([]);
        [...pm.siteKeywords].should.be.eql([['google', PriorityMap.confidence.site]]);
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
        let url = new Url('https://www.not.google.com');
        let pm = new PriorityMap(url);
        [...pm.siteKeywords].map((item) => item[0]).should.not.include('www');
        [...pm.siteKeywords].map((item) => item[0]).should.not.include('not');
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
      [...pm.vipWords].should.eql([['test', PriorityMap.confidence.vip]]);
    });
    it('should be case-insensitive', () => {
      pm.addVipWords('test');
      pm.addVipWords('Test');
      [...pm.vipWords].map(group => group[0]).should.eql(['test']);
    });
    it('should ignore blacklist words and siteKeywords', () => {
      pm.addVipWords('google');
      pm.addVipWords('Google');
      pm.addVipWords('not');
      [...pm.vipWords].should.eql([]);
    });
    it('should increase confidence if word already exist', () => {
      pm.addVipWords('test');
      pm.addVipWords('Test');
      [...pm.vipWords].should.eql([['test', PriorityMap.confidence.vip * 2]]);
    });
  });
});