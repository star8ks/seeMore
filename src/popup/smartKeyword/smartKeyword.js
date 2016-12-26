/**
 * Intelligently get page's keyword, based on url, title, heading, keyword meta
 * Created by ray7551@gmail.com on 12.10 010.
 */
import _ from 'lodash';
import {clog, filterEmptyStr, match as matchAll} from '../../common/base';
import {PUNCT, PUNCT_FLATTEN, CONFIDENCE_PARAM, CONFIDENCE_MIN, EMPTY_KEYWORDS} from './const';
import {markVipKeyword, divide, forEachMarked} from './wordHelper';
import PriorityMap from './PriorityMap';

const keywordType = {
  meta: Symbol(),
  title: Symbol(),
  h1: Symbol(),
  h2: Symbol(),
  url: Symbol()
};

/**
 * @param {Url} tabUrl
 * @param {String[]} meta
 * @param {String} title
 * @param {String} h1
 * @param {String[]} h2
 * @param {String[]} [siteKeywords=[]]
 * */
function smartKeyword(tabUrl, meta, title, h1, h2, siteKeywords) {
  siteKeywords = siteKeywords || [];
  let candidateWords = new PriorityMap(tabUrl, CONFIDENCE_PARAM.map, siteKeywords);

  meta = _.flatten(meta.map(metaStr => divide(metaStr)));
  title = _fixSpaces(title);
  h1 = _fixSpaces(h1);
  clog('divided meta:', meta)

  let titleMarked = matchAll(title, /《([^《》]+)》/g) || [];
  let h1Marked = matchAll(h1, /《([^《》]+)》/g) || [];
  // add original marked words
  [...titleMarked, ...h1Marked].forEach((matched) => {
    if(matched[1]) candidateWords.addVipWords(matched[1], CONFIDENCE_PARAM.map.originVip);
  });

  titleMarked = matchAll(markVipKeyword(title), /《([^《》]+)》/g) || [];
  h1Marked = matchAll(markVipKeyword(h1), /《([^《》]+)》/g) || [];

  clog('', markVipKeyword(title));
  [...titleMarked, ...h1Marked].forEach((matched) => {
    if(matched[1]) candidateWords.addVipWords(matched[1]);
  });
  clog('vipWords: ', JSON.stringify([...candidateWords.vipWords]))
  clog('siteWords: ', JSON.stringify([...candidateWords.siteKeywords]))
  // clog(tabUrl.url, meta, title, h1, h2);

  // 1. without divide
  // see if keywords.meta[i] appeared in title, head or tabUrl, use meta as keyword array
  _matchKeywords(meta, keywordType.meta);
  // clog(candidateWords)
  if (_isQualified(candidateWords.orderedArray)) {
    clog('use meta keywords')
    return candidateWords.orderedArray;
  }

  // 2. completely divide all string into words
  // get frequently appeared words as keyword array(ordered by priority)
  candidateWords.clear();
  const punctuations = _.chain(PUNCT_FLATTEN).reduce(_.add);
  // lodash.escapeRegExp will escape [], and \s is not properly escaped, so put them outside
  const punctuationsRegex = '[' + _.escapeRegExp(punctuations) + '\\s]+|\\b';
  const SEPARATE_REGEX = _getDividerRegex(punctuationsRegex, 'g');
  clog('separate regex', SEPARATE_REGEX)

  let dividePreProcess = _.flow(_replaceUnderscore, _fixHyphen);
  title && filterEmptyStr(dividePreProcess(title).split(SEPARATE_REGEX)).forEach(word => {
    candidateWords.increaseConfidence(word, CONFIDENCE_PARAM.keyword.title);
  });
  h1 && filterEmptyStr(dividePreProcess(h1).split(SEPARATE_REGEX)).forEach(word => {
    candidateWords.increaseConfidence(word, CONFIDENCE_PARAM.keyword.h1);
  });
  Array.isArray(h2) && h2.forEach(h2 => {
    // clog(h2.split(SEPARATE_REGEX))
    filterEmptyStr(h2.split(SEPARATE_REGEX)).forEach(word =>
      candidateWords.increaseConfidence(word, CONFIDENCE_PARAM.keyword.h2)
    );
  });
  // @TODO divide tabUrl.url here

  clog('most frequently appeared words: ', JSON.stringify(candidateWords.orderedArray))
  if (_isQualified(candidateWords.orderedArray)) {
    clog('use divide keywords')
    return candidateWords.orderedArray;
  }

  // 3. divide title with common separator
  candidateWords.clear();
  const divider = _.chain([
    ...PUNCT.dash, ...PUNCT.verticalBar, ...PUNCT.colon, ...PUNCT.brackets,
    ...PUNCT.comma, ...PUNCT.question, ...PUNCT.exclamation,
    ...PUNCT.guillemets.left, ...PUNCT.guillemets.right
  ]).reduce(_.add);
  const dividerStr = '[' + _.escapeRegExp(divider) + ']+|-{2,}';
  const TITLE_DIVIDE_REGEXP = _getDividerRegex(dividerStr);
  clog(TITLE_DIVIDE_REGEXP)
  let preProcess = _.flow([_replaceUnderscore, _replaceSpaces, _fixHyphen]);
  let titleKeywords = filterEmptyStr(preProcess(title).split(TITLE_DIVIDE_REGEXP));
  clog('titleKeywords:', titleKeywords)
  _matchKeywords(titleKeywords, keywordType.title);

  if (_isQualified(candidateWords.orderedArray)) {
    clog('use title keywords')
    return candidateWords.orderedArray;
  }
  clog('vip array', candidateWords.vipArray)
  if (_isQualified(candidateWords.vipArray)) {
    clog('use vip keywords')
    return candidateWords.vipArray;
  }

  clog('failed to get smartKeyword')
  return EMPTY_KEYWORDS;

  function _matchKeywords(keywords, ignore) {
    for (let keyword of keywords) {
      if (ignore !== keywordType.title && title.includeString(keyword)) {
        candidateWords.increaseConfidence(keyword, CONFIDENCE_PARAM.match.title);
      }
      if (ignore !== keywordType.url && tabUrl.pathName.includeString(keyword)) {
        candidateWords.increaseConfidence(keyword, CONFIDENCE_PARAM.match.url);
      }
      ignore !== keywordType.url && tabUrl.queryPairs.map(pair => {
        if (pair.val.includeString(keyword, pair.val.length >= 2)) {
          candidateWords.increaseConfidence(keyword, CONFIDENCE_PARAM.match.queryPairs);
        }
      });
      ignore !== keywordType.meta && meta.forEach(metaKeyword => {
        if (metaKeyword.includeString(keyword, true)) {
          candidateWords.increaseConfidence(keyword, CONFIDENCE_PARAM.match.meta);
        }
      });
      if (ignore !== keywordType.h1 && h1.includeString(keyword)) {
        candidateWords.increaseConfidence(keyword, CONFIDENCE_PARAM.match.h1);
      }
      ignore !== keywordType.h2 && h2.forEach(function (h2) {
        if (h2.includeString(keyword)) {
          candidateWords.increaseConfidence(keyword, CONFIDENCE_PARAM.match.h2);
        }
      });
    }
  }

  function _isQualified(orderedArray, minConfidence = CONFIDENCE_MIN) {
    return !_.isEmpty(orderedArray) && orderedArray[0].confidence > minConfidence;
  }

  function _getDividerRegex(divider, modifier) {
    const escapedStr = divider.replace(/(^.*[^\\]?\[.*)-(.*\])/g, '$1\\-$2');
    return new RegExp(escapedStr, modifier);
  }

  function _replaceSpaces(str, replace = '|') {
    replace = `$1${replace}$2`;
    return str.replace(/(\W)\s+(\W)/g, replace).replace(/(\W)\s+([a-z])/ig, replace)
      .replace(/([a-z])\s+(\W)/ig, replace);
  }

  function _replaceUnderscore(str, replace = '|') {
    replace = `$1${replace}$2`;
    return str.replace(/(\W)_+(\W)/g, replace).replace(/(\W)_+(\w)/g, replace)
      .replace(/(\w)_+(\W)/g, replace);
  }

  /**
   * replace multiple spaces and return to one space
   * */
  function _fixSpaces(str) {
    return str.replace(/\s+/g, ' ').replace(/(\s+No\.)\s+(\d+)\b/ig, ' No.$2');
  }
  function _fixHyphen(str, replace = '') {
    replace = `$1${replace}$2`;
    let hyphens = PUNCT.dash.reduce((hyphens, current) => {
      hyphens += current;
      return hyphens;
    }, '');
    let regex = _getDividerRegex(`(\w)[${hyphens}]+(\w)`, 'g');
    return str.replace(regex, replace);
  }
}

export default smartKeyword;