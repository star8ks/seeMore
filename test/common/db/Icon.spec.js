import '../../dirtyShould';
import fetchMock from 'fetch-mock';
import Icon from '../../../src/common/db/Icon';

describe('Icon', function () {
  'use strict';

  beforeEach(function() {
    return Icon.lf.ready().then(function() {
      return Icon.lf.clear();
    }).then(function () {
      return Promise.all([
        Icon.set('www.google.com', 'www.google.com'),
        Icon.set('google.com', 'google.com'),
        Icon.set('www.baidu.com', 'www.baidu.com')
      ]);
    });
  });

  describe('search', function () {
    it('should return null if not found', function () {
      return Icon.search('e.com').then(function (url) {
        (url === null).should.be.true();
      });
    });
    it('should accept String', function () {
      return Icon.search('www.google.com').then(function (url) {
        url.should.equal('www.google.com');
      });
    });
    it('should accept String[]', function () {
      return Icon.search(['www.google.com', 'google.com']).then(function (url) {
        url.should.be.oneOf(['www.google.com', 'google.com']);
      });
    });
    it('should throw Error if given empty array or empty string', function () {
      (() => {Icon.search([])}).should.Throw(Error, /not be an empty array or empty string/);
      (() => {Icon.search('')}).should.Throw(Error, /not be an empty array or empty string/);
    });
    it('should compare host case insensitively', function () {
      return Icon.search('www.Google.com').then(function (url) {
        url.should.equal('www.google.com');
      });
    });
  });

  describe('fetch', () => {
    it('should return from db as search if icon exists', () => {
      return Icon.fetch('www.google.com').then(url => url.should.equal('www.google.com'));
    });
    it('should fetch favicon image if not exists', () => {
      fetchMock.get('*', 'Hello, World!');
      return Icon.fetch('www.github.com').then(url => {
        url.should.equal('data:text/plain;charset=utf-8;base64,SGVsbG8sIFdvcmxkIQ==');
        fetchMock.restore();
      });
    });
  });
});