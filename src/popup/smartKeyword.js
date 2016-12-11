/**
 * Intelligently get page's keyword, based on url, title, heading, keyword meta
 * Created by ray7551@gmail.com on 12.10 010.
 */
import _ from 'lodash';
import {clog, filterEmptyStr} from '../common/base';
import {CONFIDENCE, EMPTY_KEYWORDS} from './keyword';

// https://en.wikipedia.org/wiki/Punctuation_of_English
const PUNCTUATIONS = ["`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "–", "-", "=", ",", ".", "/", "<", ">", "?", "[", "]", "\\", "{", "}", "|", ";", "'", ":", "\"", "·", "！", "￥", "…", "（", "）", "—", "【", "】", "《", "》", "；", "‘", "’", "：", "“", "”", "，", "。", "？"];
const PUNCTUATION = {
  // punctuations
  apostrophe: ["’", "'"],
  brackets: ["[", "]", "(", ")", "{", "}", "⟨", "⟩"],
  colon: [":"],
  comma: [",", "،", "、"],
  dash: ["-", "‐", "‒", "–", "—", "―"],
  ellipsis: ["…", "..."],
  exclamation: ["!"],
  period: ["."],
  guillemets: ["‹", "›", "«", "»"],
  question: ["?", "？"],
  quotation: ["‘", "’", "“", "”", "'", "'", "\""],
  semicolon: [";"],
  slash: ["/", "⁄"],
  // word dividers
  interpunct: ["·", "・", "･"],
  space: [" ", " ", " ", "	"],
  // typography
  verticalBar: ["|", "¦", "‖", "∣"],
};
/**
 * keyword blacklist
 * @notice all in lower case
 * @see https://en.wikibooks.org/wiki/English_in_Use/Prepositions,_Conjunctions,_and_Interjections
 */
const KEYWORD_BLACKLIST = [
  ...PUNCTUATIONS,
  "i", "me", "you", "he", "she", "they", "anybody", "it", "one", "there", "that", "this", "other",
  "my", "your", "his", "her", "there", "own",
  "the", "a", "my", "more", "much", "either",
  "while", "meanwhile",
  "is", "isn't", "isnt", "am", "ain't", "aint", "are", "have", "has", "get", "gets", "got", "was", "wasnt",
  "no", "not", "nor",
  "what", "when", "who", "how", "why",
  "very", "so", "most", "least", "all", "only", "just", "but",
  "do", "doing", "did", "does", "can", "cannot", "can't",
  // https://en.wikipedia.org/wiki/List_of_English_prepositions
  "about", "above", "across", "after", "against", "along", "amid", "among", "around", "at", "by", "before", "behind", "below", "beneath", "beside", "besides", "between", "beyond", "during", "except", "for", "from", "in", "into", "of", "off", "on", "over", "past", "through", "to", "toward", "towards", "under", "underneath", "until", "with", "without",
  // Conjunctions
  "and", "as", "both", "because", "even", "for", "if", "that", "then", "since", "seeing", "so", "or", "nor", "either", "neither", "than", "though", "although", "yet", "but", "except", "whether", "lest", "unless", "save", "provided", "notwithstanding", "whereas"
];

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

  increaseConfidence(key, increment = 1) {
    key = key.toLowerCase();
    if (KEYWORD_BLACKLIST.includes(key) || /^\d+$/.test(key)) return;
    this.map.has(key)
      ? this.map.set(key, this.map.get(key) + increment)
      : this.map.set(key, increment);
  }
}

/**
 * @param {Url} tabUrl
 * @param {String[]} meta
 * @param {String} title
 * @param {String} h1
 * @param {String[]} h2
 * */
function smartKeyword(tabUrl, meta, title, h1, h2) {
  if(!h1 && h2.length === 1) {
    h1 = h2[0];
    h2 = [];
  }

  function _matchKeywords(keywords, ignore) {
    for (let keyword of keywords) {
      if (ignore !== 'h1' && h1.includeString(keyword)) {
        candidateWords.increaseConfidence(keyword, CONFIDENCE);
      }
      if (ignore !== 'title' && title.includeString(keyword)) {
        candidateWords.increaseConfidence(keyword, CONFIDENCE);
      }
      if (ignore !== 'url' && tabUrl.url.includeString(keyword)) {
        candidateWords.increaseConfidence(keyword, CONFIDENCE);
      }
      ignore !== 'url' && tabUrl.queryPairs.map(pair => {
        if (pair.val.includeString(keyword)) {
          candidateWords.increaseConfidence(keyword, .1 * CONFIDENCE);
        }
      });
      ignore !== 'h2' && h2.forEach(function (h2) {
        if (h2.includeString(keyword)) {
          candidateWords.increaseConfidence(keyword, .01 * CONFIDENCE);
        }
      });
    }
  }

  function _isQualified(orderedArray, minConfidence = CONFIDENCE) {
    return !_.isEmpty(orderedArray) && orderedArray[0].confidence >= minConfidence;
  }

  let candidateWords = new priorityMap();

  // 1. without divide
  // see if keywords.meta[i] appeared in title, head or tabUrl, use meta as keyword array
  _matchKeywords(meta);
  // clog(candidateWords)

  if (_isQualified(candidateWords.orderedArray)) {
    clog('use meta keywords')
    return candidateWords.orderedArray;
  }

  function _getDividerRegex(divider, modifier) {
    const escapedStr = divider.replace(/(^.*[^\\]?\[.*)-(.*\])/g, '$1\\-$2');
    return new RegExp(escapedStr, modifier);
  }

  function _replaceSpaces(str, replace='|') {
    replace = `$1${replace}$2`;
    return str.replace(/(\W)\s+(\W)/g, replace).replace(/(\W)\s+(\w)/g, replace)
      .replace(/(\w)\s+(\W)/g, replace);
  }

  function _replaceHyphen(str, replace='') {
    replace = `$1${replace}$2`;
    let hyphens = PUNCTUATION.dash.reduce((hyphens, current) => {
      hyphens += current;
      return hyphens;
    }, '');
    let regex = _getDividerRegex(`(\w)[${hyphens}]+(\w)`, 'g');
    return str.replace(regex, replace);
  }

  // 2. completely divide all string into words
  // get frequently appeared words as keyword array(ordered by priority)
  candidateWords.clear();
  const punctuations = PUNCTUATIONS.reduce((str, current) => {
    str += current;
    return str;
  }, '');
  // lodash.escapeRegExp will escape [], and \s is not properly escaped, so put them outside
  const punctuationsRegex = '[' + _.escapeRegExp(punctuations) + '\\s]+|\\b';
  const SEPARATE_REGEX = _getDividerRegex(punctuationsRegex);
  clog('separate regex', SEPARATE_REGEX)

  title && filterEmptyStr(title.replace(/(\w)-+(\w)/g, '$1$2').split(SEPARATE_REGEX)).forEach(word => {
    candidateWords.increaseConfidence(word, .6 * CONFIDENCE)
  });
  h1 && filterEmptyStr(h1.split(SEPARATE_REGEX)).forEach(word =>
    candidateWords.increaseConfidence(word, .3 * CONFIDENCE)
  );
  !_.isEmpty(h2) && h2.forEach(h2 => {
    // clog(h2.split(SEPARATE_REGEX))
    filterEmptyStr(h2.split(SEPARATE_REGEX)).forEach(word =>
      candidateWords.increaseConfidence(word, .01 * CONFIDENCE)
    );
  });
  // @TODO divide tabUrl.url here

  if (_isQualified(candidateWords.orderedArray)) {
    clog('use divide keywords')
    return candidateWords.orderedArray;
  }

  // 3. divide title with common separator
  candidateWords.clear();
  const divider = [
    ...PUNCTUATION.dash, ...PUNCTUATION.verticalBar, ...PUNCTUATION.colon, ...PUNCTUATION.brackets,
    ...PUNCTUATION.interpunct, ...PUNCTUATION.comma, ...PUNCTUATION.question
  ].reduce((str, current) => {
    str += current;
    return str;
  }, '');
  const dividerStr = '[' + _.escapeRegExp(divider) + ']+|-{2,}';
  const TITLE_DIVIDE_REGEXP = _getDividerRegex(dividerStr);
  clog(TITLE_DIVIDE_REGEXP)
  let titleKeywords = filterEmptyStr(_replaceHyphen(_replaceSpaces(title)).split(TITLE_DIVIDE_REGEXP));
  clog('titleKeywords:', titleKeywords)
  _matchKeywords(titleKeywords, 'title');

  if (!_.isEmpty(candidateWords.orderedArray)) {
    clog('use title keywords')
    return candidateWords.orderedArray;
  }

  clog('failed to get smartKeyword')
  return EMPTY_KEYWORDS;
}

export default smartKeyword