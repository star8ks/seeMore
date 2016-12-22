import _ from 'lodash';
import CONFIG from '../common/config';
import {clog, filterEmptyStr} from "../common/base.js";
import Engine from '../common/db/Engine';
import Url from '../common/Url';
import ChromeAsync from '../common/ChromeAsync';
import {CONFIDENCE, EMPTY_KEYWORDS} from './smartKeyword/const';
import smart from './smartKeyword/smartKeyword';

let chromeAsync = new ChromeAsync(chrome);
let chromeTabsProxy = chromeAsync.proxy(chrome.tabs);


// get keyword from selected text
async function getSelection(tabUrl) {
  if (!tabUrl.isNormal) {
    return EMPTY_KEYWORDS;
  }
  // @TODO move it to contentScript.js, and execute while select change
  // @TODO don't block popup here
  var selection = await chromeTabsProxy.executeScript({
    code: "window.getSelection().toString();",
    allFrames: true
  });

  selection = filterEmptyStr(selection).filter(selectStr => {
    return selectStr.length <= CONFIG.selectionMaxLength;
  });
  // @TODO add all selection to auto-complete suggestion list
  if (!_.isEmpty(selection)) {
    return [{
      word: selection[0],
      confidence: CONFIDENCE
    }];
  }
  return EMPTY_KEYWORDS;
}

// get keyword from tab url
async function getQueryString(tabUrl) {
  if (tabUrl.isGoogleFail) {
    tabUrl = new Url(decodeURIComponent(tabUrl.getQueryVal('continue')));
  }

  let keys = await Engine.searchKeys(tabUrl.host);
  if (keys.length <= 0) {
    return EMPTY_KEYWORDS;
  }
  let engine = await Engine.get(keys[0]);

  try {
    engine.resultPageRegex = engine.resultPageRegex || _.escapeRegExp(new Url(engine.url).pathName);
    if(engine.resultPageRegex) {
      let resultPageRegex = new RegExp(engine.resultPageRegex);
      clog(resultPageRegex)
      if(!resultPageRegex.test(tabUrl.url)) {
        clog('Matched a engine, but not a result page. resultPageRegex: ', resultPageRegex);
        return EMPTY_KEYWORDS;
      }
    }
  } catch(e) {
    clog('Error while try to test url', e);
  }
  let searchKey = (new Url(engine.url)).searchKey;
  let searchStrings = _.filter(tabUrl.queryPairs, {key: searchKey});
  let searchString = /google/.test(tabUrl.host) && searchStrings.length
    ? _.last(searchStrings).val
    : searchStrings[0].val;
  clog('match searchString from url:', searchString);
  return searchString ? [{
    word: decodeURIComponent(searchString),
    confidence: CONFIDENCE
  }] : EMPTY_KEYWORDS;
}

/**
 * get keyword of current tab
 * @return {{word:String, confidence: Number}[]} a Promise resolve an Array order by string frequency
 * */
async function smartKeyword(tabUrl) {
  if (!tabUrl.isNormal) {
    return EMPTY_KEYWORDS;
  }
  let result = await chromeTabsProxy.executeScript({
    file: require('file-loader?name=js/[name].[ext]!./contentScript.js')
  });

  clog('content script result: ', result)
  let unfiltered = result[0];
  if(!unfiltered) return EMPTY_KEYWORDS;

  let keywords = {};
  Object.keys(unfiltered).forEach(key => {
    keywords[key] = filterEmptyStr(unfiltered[key]);
  });

  return smart(tabUrl, keywords.meta, keywords.title, keywords.h1, keywords.h2);
}

/**
 * @param {Url} tabUrl
 * @return {Promise} resolve {{word: String, confidence: Number}[]}
 * */
async function getKeyword(tabUrl) {
  let keywords = await getSelection(tabUrl);
  if(!_.isEqual(keywords, EMPTY_KEYWORDS)) return keywords;

  keywords = await getQueryString(tabUrl);
  if(!_.isEqual(keywords, EMPTY_KEYWORDS)) return keywords;

  keywords = await smartKeyword(tabUrl);
  return keywords;
}

export default getKeyword;