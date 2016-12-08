import _ from 'lodash';
import CONFIG from '../common/config';
import {clog, minErr, filterEmptyStr} from "../common/base.js";
import Engine from '../common/db/Engine';
import Url from '../common/Url';

let keywordErr = minErr('keyword');

const CONFIDENCE = 1;
const EMPTY_KEYWORDS = [{
  word: '',
  confidence: 0
}];

const PUNCTUATIONS = ["`","~","!","@","#","$","%","^","&","*","(",")","_","+","-","=",",",".","/","<",">","?","[","]","\\","{","}","|",";","'",":","\"","·","！","￥","…","（","）","—","【","】","；","‘","’","：","“","”","，","。","《","》","？"];

/**
 * keyword blacklist
 * @notice all in lower case
 * @see https://en.wikibooks.org/wiki/English_in_Use/Prepositions,_Conjunctions,_and_Interjections
 */
const KEYWORD_BLACKLIST = [
    ...PUNCTUATIONS,
  "i", "me", "you", "he", "she", "they", "anybody", "it", "one", "there", "that", "this","other",
  "my", "your", "his", "her", "there","own",
  "the", "a", "my", "more", "much", "either",
  "while", "meanwhile",
  "is", "am", "are", "have", "got", "do",
  "no", "not", "nor",
  "what", "when", "who", "how", "why",
  // https://en.wikipedia.org/wiki/List_of_English_prepositions
  "about","above","across","after","against","along","amid","among","around","at","by","before","behind","below","beneath","beside","besides","between","beyond","during","except","for","from","in","into","of","off","on","over","past","through","to","toward","towards","under","underneath","until","with","without",
  // Conjunctions
  "and", "as", "both", "because", "even", "for", "if", "that", "then", "since", "seeing", "so", "or", "nor", "either", "neither", "than", "though", "although", "yet", "but", "except", "whether", "lest", "unless", "save", "provided", "notwithstanding", "whereas"
];

// get keyword from selected text
function getSelection(tabUrl) {
  if (!tabUrl.isNormal) {
    return Promise.resolve(EMPTY_KEYWORDS);
  }
  return new Promise((resolve, reject) => {
    // @TODO move it to contentScript.js, and execute when select change
    // @TODO don't block popup here
    chrome.tabs.executeScript({
      code: "window.getSelection().toString();",
      allFrames: true
    }, selection => {
      if (chrome.runtime.lastError) {
        reject(keywordErr('executeScriptErr', chrome.runtime.lastError.message));
        return;
      }
      selection = filterEmptyStr(selection);
      if (!_.isEmpty(selection) && selection[0].length <= CONFIG.selectionMaxLength) {
        resolve([{
          word: selection[0],
          confidence: CONFIDENCE
        }]);
        return;
      }
      resolve(EMPTY_KEYWORDS);
    });
  });
}

// get keyword from tab url
function getQueryString(tabUrl) {
  if (tabUrl.isGoogleFail) {
    tabUrl = new Url(decodeURIComponent(tabUrl.getQueryVal('continue')));
  }
  return Engine.searchKeys(tabUrl.host).then(keys => {
    if (keys.length <= 0) {
      return EMPTY_KEYWORDS;
    }
    return Engine.get(keys[0]).then(engine => {
      let searchKey = (new Url(engine.url)).searchKey;
      let searchString = tabUrl.getQueryVal(searchKey);
      return searchString ? [{
        word: decodeURIComponent(searchString),
        confidence: CONFIDENCE
      }] : EMPTY_KEYWORDS;
    });
  })
}

class priorityMap {
  constructor() {
    this.map = new Map();
  }
  get orderedArray() {
    return [...this.map].sort((a, b) =>
      (b[1] - a[1])
    ).map(item => ({
      word: item[0],
      confidence: item[1]
    }))
  }
  clear() {
    this.map.clear();
  }
  increaseConfidence(key, increment=1) {
    key = key.toLowerCase();
    if(KEYWORD_BLACKLIST.includes(key)) return;
    this.map.has(key)
      ? this.map.set(key, this.map.get(key) + increment)
      : this.map.set(key, 1);
  }
}

/**
 * get keyword of current tab
 * @return {Promise} resolve an Array order by string frequency
 * */
function smartKeyword(tabUrl) {
  if (!tabUrl.isNormal) {
    return Promise.resolve(EMPTY_KEYWORDS);
  }
  return new Promise((resolve, reject) => {
    chrome.tabs.executeScript({
      file: require('file-loader?name=js/[name].[ext]!./contentScript.js')
    }, result => {
      if (chrome.runtime.lastError) {
        reject(keywordErr('executeScriptErr', chrome.runtime.lastError.message));
        return;
      }

      clog('content script result: ', result)
      let unfiltered = result[0];
      let keywords = {};
      Object.keys(unfiltered).forEach(key => {
        keywords[key] = filterEmptyStr(unfiltered[key]);
      });

      // 1. see if keywords.meta[i] appeared in title or head, use meta as keyword array
      let candidateWords = new priorityMap();

      // TODO: move it to function matchKeyword
      for (let metaKeyword of keywords.meta) {
        if (keywords.h1.includeString(metaKeyword)) {
          candidateWords.increaseConfidence(metaKeyword, CONFIDENCE);
        }
        if (keywords.title.includeString(metaKeyword)) {
          candidateWords.increaseConfidence(metaKeyword, CONFIDENCE);
        }
        if (tabUrl.url.includeString(metaKeyword)) {
          candidateWords.increaseConfidence(metaKeyword, CONFIDENCE);
        }
        tabUrl.queryPairs.map(pair => {
          if(pair.val.includeString(metaKeyword)) {
            candidateWords.increaseConfidence(metaKeyword, .01 * CONFIDENCE);
          }
        });
        keywords.h2.forEach(function (h2) {
          if(h2.includeString(metaKeyword)) {
            candidateWords.increaseConfidence(metaKeyword, .01 * CONFIDENCE);
          }
        });
      }
      clog(candidateWords)

      if (!_.isEmpty(candidateWords.orderedArray)) {
        clog('use meta keywords')
        resolve(candidateWords.orderedArray);
        return;
      }

      // 2. get the top n frequently appeared strings as keyword array
      candidateWords.clear();
      const punctuationsStr = PUNCTUATIONS.reduce((str, current) => {
        str += current;
        return str;
      }, '');
      // lodash.escapeRegExp will escape [], and \s is not properly escaped, so put them outside
      const temp = '[' + _.escapeRegExp(punctuationsStr) + '\\s+]';
      clog('escaped after lodash: ', temp)
      const escapedRegExp = temp.replace(/(^.*[^\\]?\[.*)(-)(.*\])/g, function replacer(match, p1, p2, p3) {
        // lodash.escapeRegExp did not escape '-', so escape the '-' inside the []
        // matched string is 'p1-p3'
        return [p1, '\\'+p2, p3].join('');
      });
      const SEPARATE_REGEX = new RegExp(escapedRegExp, 'g');
      clog(SEPARATE_REGEX)

      keywords.title && filterEmptyStr(keywords.title.split(SEPARATE_REGEX)).forEach(word => {
        clog(word)
        candidateWords.increaseConfidence(word, .1 * CONFIDENCE)
      });
      keywords.h1 && filterEmptyStr(keywords.h1.split(SEPARATE_REGEX)).forEach(word =>
        candidateWords.increaseConfidence(word, .1 * CONFIDENCE)
      );
      !_.isEmpty(keywords.h2) && keywords.h2.forEach(h2 => {
        filterEmptyStr(h2.split(SEPARATE_REGEX)).forEach(word =>
          candidateWords.increaseConfidence(word, 0.01 * CONFIDENCE)
        );
      });

      // TODO: run matchKeyword(dividedWords) here
      if (!_.isEmpty(candidateWords.orderedArray)) {
        clog('use divided keywords')
        resolve(candidateWords.orderedArray);
        return;
      }

      clog('failed to get smartKeyword')
      resolve(EMPTY_KEYWORDS);
    });
  });
}

/**
 * @param {Url} tabUrl
 * @return {Promise} resolve {{word: String, confidence: Number}[]}
 * */
function getKeyword(tabUrl) {
  return getSelection(tabUrl).then(keywords => {
    return !_.isEqual(keywords, EMPTY_KEYWORDS) ? keywords : getQueryString(tabUrl)
  }).then(keywords => {
    return !_.isEqual(keywords, EMPTY_KEYWORDS) ? keywords : smartKeyword(tabUrl)
  });
}

export default getKeyword;