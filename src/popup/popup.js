import {isEmpty, debounce} from 'lodash';
import tjs from './translation';
import CONFIG from '../common/config';
import {clog, $, $all, filterEmptyStr, onceLoaded, getCurrentTab, getMouseButton, minErr} from "../common/base";
import Url from '../common/Url';
import Render from '../common/Render';
import Mason from '../common/Mason';
import getKeyword from './keyword';

tjs.add(new tjs.BaiDu());
tjs.add(new tjs.Google());
if(CONFIG.devMode) tjs.add(new tjs.GoogleCN());

let popupErr = minErr('Popup');

/**
 * @param {Error} e
 * */
function errorHandler(e) {
  clog.err(e.toString());
  //noinspection JSUnresolvedVariable
  clog.err('Error stack: ', e.stack);
}

class Links {
  constructor($links) {
    this.$links = $links;
  }

  init(tabId) {
    this.$links.forEach(function ($link) {
      // set icons
      $link.style.backgroundImage = "url('" + $link.getAttribute('data-favicon') + "')";

      $link.onclick = function (evt) {
        var button = getMouseButton(evt);
        switch (button) {
          case 'left':
            chrome.tabs.update(tabId, {url: this.href});
            break;
          case 'middle':
            chrome.tabs.create({url: this.href});
            break;
          default:
            break;
        }
        evt.preventDefault();
      }
    });
  }

  updateHref(searchWord) {
    if (!searchWord) return new popupErr('invalid param: updateLinkHref with empty string');
    this.$links.forEach(function ($link) {
      $link.href = $link.getAttribute('data-url').replace(/%s/g, encodeURIComponent(searchWord));
    });
  }
}

class Keyword {
  constructor($keyword) {
    this.$el = $keyword;
    this.$el.focus();
    this.$el.addEventListener('input', debounce(() => {
      this.dispatchEvent();
    }, 500));
  }

  dispatchEvent() {
    this.$el.dispatchEvent(new CustomEvent(
      'keywordUpdated',
      {detail: this.$el.value}
    ));
  }

  onUpdated(fn) {
    this.$el.addEventListener('keywordUpdated', fn)
  }

  get value() {
    return this.$el.value;
  }
  set value(val) {
    this.$el.value = val;
    this.dispatchEvent();
  }
}

onceLoaded(getCurrentTab).then(function onLoad(tab) {
  let tabUrl = new Url(tab.url);
  let keyword = new Keyword($`#keyword`);
  let $translation = $`.translation`;
  let links;
  let engineListTpl = $`#tpl-engines`.innerHTML.trim();
  let $enginesSection = $`.engines`;
  keyword.onUpdated((e) => {
    let searchString = e.detail.trim();
    clog('translate ', searchString);
    if (searchString && searchString.length <= CONFIG.translateMaxLength) {
      translate(searchString).then(function (html) {
        $translation.innerText = html;
      }).catch(errorHandler);
    }
    if(links && searchString) links.updateHref(searchString);
  });

  Render.openEngines(engineListTpl).then(function (rendered) {
    $enginesSection.innerHTML = rendered;
    links = new Links($all`.engines .icon-link`);
  }).then(function () {
    new Mason($`.engines`, {
      itemSelector: '.pin',
      columnNum: 2
    });
    links.init(tab.id, keyword.value);
  }).catch(errorHandler);

  getKeyword(tabUrl).then(function (keywords) {
    clog('get keywords: ', JSON.stringify(keywords));
    var displayStr = keywords[0].word.trim();
    // @TODO if input is not empty, cancel getKeyWord and don't change input and link
    // @TODO add all keywords to auto-complete suggestion list
    keyword.value = displayStr;
    return null;
  }).catch(errorHandler);

  /**
   * @param {String} str
   * */
  function translate(str) {
    str = str.trim().replace(/\n/, '') || '';
    // @TODO only translate some language, from user config
    // @TODO not translate some language, from user config
    // if(chrome.i18n.detect)
    if (str.length > CONFIG.translateMaxLength) {
      return Promise.reject(new popupErr('Translation: String too long: ' + str));
    }

    var lang = navigator.language.split('-', 1)[0];
    return tjs.translate({
      api: CONFIG.devMode
        ? 'GoogleCN'
        : (navigator.language === 'zh-CN' ? 'BaiDu' : 'Google'),
      text: str,
      to: CONFIG.devMode
        ? 'zh-CN'
        : (lang === 'zh' ? navigator.language : lang)
    }).then(function (resultObj) {
      if (resultObj.error) return null;
      return resultObj.detailed || resultObj.result;
    }).then(function (translated) {
      return isEmpty(filterEmptyStr(translated)) ? '' : translated.filter(function (line) {
          return line.toLowerCase() !== str.toLowerCase();
        }).reduce(function (html, line) {
          html += line + '\n';
          return html;
        }, '');
    });
  }
});
