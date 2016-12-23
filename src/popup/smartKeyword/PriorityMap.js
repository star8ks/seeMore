import {PRINTABLE_ASCII, KEYWORD_BLACKLIST} from './const';
/**
 * Just like normal Map, but use case insensitive string as key
 * */
class StringMap{
  constructor() {
    this.map = {};
  }
  get size() {
    return Object.keys(this.map).length;
  }
  has(key) {
    if(typeof key !== 'string') throw new Error('key must be a string, but given:' + key);
    return Object.keys(this.map).includes(key.toLowerCase());
  }
  set(key, val) {
    if(typeof key !== 'string') throw new Error('key must be a string, but given:' + key);
    if(val === undefined) throw new Error('value cannot be undefined');
    this.map[key.toLowerCase()] = Object.defineProperties({}, {
      'val': {value: val, enumerable: true},
      '$originKey': {value: key}
    });
  }
  get(key) {
    if(typeof key !== 'string') throw new Error('key must be a string, but given:' + key);
    let valObj = this.map[key.toLowerCase()];
    return valObj===undefined ? undefined : valObj.val;
  }
  clear() {
    this.map = {};
  }
  *[Symbol.iterator]() {
    let keys = Object.keys(this.map);
    for(let key of keys) {
      yield [this.map[key].$originKey, this.map[key].val];
    }
   }
}
/**
 * @author ray7551@gmail.com
 */
class PriorityMap {
  /**
   * @param {Url} url
   * @param {Number} [baseConfidence=1]
   * */
  constructor(url, baseConfidence = 1) {
    Object.keys(PriorityMap.confidence).forEach(function (key) {
      PriorityMap.confidence[key] = baseConfidence * PriorityMap.confidence[key];
    });
    this.map = new StringMap();
    this.siteKeywords = new StringMap();
    this._setSiteKeywords(url);
    this.vipWords = new StringMap();
  }

  /**
   * @param {String} word
   * @return {Boolean}
   * */
  static _inBlackList(word) {
    word = word.toLowerCase();
    return KEYWORD_BLACKLIST.includes(word)
      || /^\d+$/.test(word)
      || word.length <= 0
      || (word.length <= 2 && word === word.toLowerCase())
      || (word.length ===1 && new RegExp(`[${PRINTABLE_ASCII}À-ÿ]`).test(word));
  }

  /**
   * @param {String} word
   * @return {String}
   * */
  static _preProcess(word) {
    // @TODO remove head and tail punctuations(common ending punct) here? consider: ect... .Net <header>
    return word.trim();
  }

  /**
   * @param {Url} url
   * */
  _setSiteKeywords(url) {
    let siteWords = url.host.split('.').slice(0, -1);
    siteWords.forEach((word) => {
      word = PriorityMap._preProcess(word);
      if (PriorityMap._inBlackList(word) || /(www)/i.test(word)) {
        return;
      }
      this.siteKeywords.set(word, PriorityMap.confidence.site);
    });
  }

  addVipWords(word, confidence = PriorityMap.confidence.vip) {
    word = PriorityMap._preProcess(word);
    if (PriorityMap._inBlackList(word) || this.siteKeywords.has(word)) return;

    this.vipWords.set(
      word,
      this.vipWords.has(word) ? this.vipWords.get(word) + confidence : confidence
    );
  }

  static toOrderedArray(map) {
    return [...map].sort((a, b) =>
      (b[1] - a[1])
    ).map(item => ({
      word: item[0],
      confidence: item[1]
    }))
  }

  get vipArray() {
    return PriorityMap.toOrderedArray(this.vipWords);
  }

  get orderedArray() {
    return PriorityMap.toOrderedArray(this.map);
  }

  clear() {
    this.map.clear();
  }

  increaseConfidence(key, increment = PriorityMap.confidence.base) {
    key = PriorityMap._preProcess(key);
    if (PriorityMap._inBlackList(key)) return;

    if (this.siteKeywords.has(key)) increment = this.siteKeywords.get(key);
    this.map.has(key)
      ? this.map.set(key, this.map.get(key) + increment)
      : this.map.set(key, this.vipWords.has(key) ? this.vipWords.get(key) + increment : increment);
  }
}
PriorityMap.confidence = {base: 1, site: .1, vip: .49};

export default PriorityMap;
export {StringMap, PriorityMap};