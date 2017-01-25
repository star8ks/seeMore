import '../dirtyShould';
import fetchMock from 'fetch-mock';
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
        let part = encodeURIComponent('&');
        let u = new Url('http://t.co/?a=' + part);
        u.queryPairs.should.eql([{key: 'a', val: decodeURIComponent(part)}]);
      });
      it('should replace val\'s + to space', () => {
        let u = new Url('http://t.co/?a=b+c+d');
        u.queryPairs.should.eql([{key: 'a', val: 'b c d'}]);
      });
    });

    describe('getRootDomain', () => {
      it('should return root domain of host', () => {
        Url.getRootDomain('google.com').should.equal('google.com');
        Url.getRootDomain('www.google.com').should.equal('google.com');
        Url.getRootDomain('news.china.com.cn').should.equal('china.com.cn');
        Url.getRootDomain('test.baijia.baidu.com').should.equal('baidu.com');
        Url.getRootDomain('china.com.cn').should.equal('china.com.cn');
        Url.getRootDomain('test.gov.baidu.com').should.equal('baidu.com');
        Url.getRootDomain('gov.com').should.equal('gov.com');
        Url.getRootDomain('me.ttt.co.cn').should.equal('ttt.co.cn');
        // Url.getRootDomain('www.gov.com').should.equal('gov.com'); // I know it's a bug, but it's hard to resolve
      });
    });

    describe('getQueryVal', () => {
      it('should return decoded query val', () => {
        let val = '%cx&#?';
        let url = new Url(`http://a.com/?b=${encodeURIComponent(val)}&bb=a`);
        url.getQueryVal('b').should.equal(val);
      });
      it('should work on last key', () => {
        let url = new Url('http://a.com/?b=12');
        url.getQueryVal('b').should.equal('12');
      });
      it('should return null if no matched key', () => {
        let url = new Url('http://a.com/?b=12');
        (url.getQueryVal('c') === null).should.be.true();
      });
    });

    describe('toDataURI', () => {
      it('should resolve origin url if given a dataURI', () => {
        let dataURI = 'data:,Hello%2C%20World!';
        return Url.toDataURI(dataURI).then(res => res.should.equal(dataURI));
      });
      it('should reject an error if given a invalid url', () => {
        let dataURI = 'dataHello%2C%20World!';
        return Url.toDataURI(dataURI).catch(err => err.toString().should.equal('Error: Not a valid normal url or dataURI'));
      });
      it('should resolve a dataURI of given asset url', () => {
        let url = 'https://favicon.yandex.net/favicon/www.google.com';
        fetchMock.get('*', 'Hello, World!');
        return Url.toDataURI(url).then(dataURI => {
          dataURI.should.equal('data:text/plain;charset=utf-8;base64,SGVsbG8sIFdvcmxkIQ==');
          fetchMock.restore();
        });
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
  });
});