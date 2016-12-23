import '../dirtyShould';
import Url from '../../src/common/Url';

describe('Url', () => {
  describe('instance properties', () => {
    let originUrl = 'https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwjAg8LvnYfRAhWL64MKHRCRAL4QPAgD#newwindow=1&hl=en&q=ms';
    let u = new Url(originUrl);
    describe('url', () => {
      it('should be origin url', () => {
        u.url.should.equal(originUrl);
      });
    });
    describe('queryPairs', () => {
      it('should be array containing key-val pairs', () => {
        u.queryPairs.should.eql([
          {"key": "hl", "val": "en"}, {"key": "sa", "val": "X"},
          {"key": "ved", "val": "0ahUKEwjAg8LvnYfRAhWL64MKHRCRAL4QPAgD"},
          {"key": "newwindow", "val": "1"}, {"key": "hl", "val": "en"},
          {"key": "q", "val": "ms"}
        ]);
      });
      it('should keep an empty string if val is empty', () => {
        let u = new Url('http://t.co/?a=');
        u.queryPairs.should.eql([{key: 'a', val: ''}]);
      });
      it('should keep an all string if key has multiple val', () => {
        let u = new Url('http://t.co/?a=&a=3&a=5');
        u.queryPairs.should.eql([{key: 'a', val: ''}, {key: 'a', val: '3'}, {key: 'a', val: '5'}]);
      });
      it('should encodeURIComponent the val', () => {
        let part = window.encodeURIComponent('&');
        let u = new Url('http://t.co/?a=' + part);
        u.queryPairs.should.eql([{key: 'a', val: window.decodeURIComponent(part)}]);
      });
      it('should replace val\'s + to space', () => {
        let u = new Url('http://t.co/?a=b+c+d');
        u.queryPairs.should.eql([{key: 'a', val: 'b c d'}]);
      });
    });
    describe('faviconUrl', () => {
    });
    describe('host, origin, pathName', () => {
      it('should like window.URL', () => {
        u.host.should.equal('www.google.com');
        u.origin.should.equal('https://www.google.com');
        u.pathName.should.equal('/webhp');
      });
    });
  })
});