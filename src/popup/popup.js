import {isEmpty, debounce} from 'lodash';
import tjs from './translation';
import CONFIG from '../common/config';
import {clog, $, $all, filterEmptyStr, onceLoaded, getCurrentTab, getMouseButton, minErr} from '../common/base';
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
    this.$links.forEach($link => {
      $link.style.backgroundImage = 'url(\'' + $link.getAttribute('data-favicon') + '\')';

      $link.addEventListener('click', evt => {
        let button = getMouseButton(evt);
        switch (button) {
        case 'left':
          chrome.tabs.update(tabId, {url: $link.href});
          break;
        case 'middle':
          chrome.tabs.create({url: $link.href});
          break;
        default:
          break;
        }
        evt.preventDefault();
      });
    });
  }

  updateHref(searchWord) {
    if (!searchWord) return new popupErr('invalid param: updateLinkHref with empty string');
    this.$links.forEach($link => {
      $link.href = $link.getAttribute('data-url').replace(/%s/g, encodeURIComponent(searchWord));
    });
  }
}

class Keyword {
  constructor($keyword) {
    this.$el = $keyword;
    this.$el.focus();
    this.$el.addEventListener('input', debounce(() => this.dispatchEvent(), 500));
  }

  dispatchEvent() {
    this.$el.dispatchEvent(new CustomEvent(
      'keywordUpdated',
      {detail: this.$el.value || this.$el.placeholder}
    ));
  }

  onUpdated(fn) {
    this.$el.addEventListener('keywordUpdated', fn);
  }

  get value() {
    return this.$el.value;
  }
  set placeholder(val) {
    this.$el.placeholder = val;
    this.dispatchEvent();
  }
}

onceLoaded(getCurrentTab).then(tab => {
  let tabUrl = new Url(tab.url);
  let keyword = new Keyword($`#keyword`);
  let $translation = $`.translation`;
  let links;
  let engineListTpl = $`#tpl-engines`.innerHTML.trim();
  let $enginesSection = $`.engines`;
  keyword.onUpdated(e => {
    let searchString = e.detail.trim();
    clog('translate ', searchString);
    if (searchString && searchString.length <= CONFIG.translateMaxLength) {
      translate(searchString).then(html => {
        $translation.innerText = html;
      }).catch(errorHandler);
    }
    if(links && searchString) links.updateHref(searchString);
  });

  Render.openEngines(engineListTpl).then(rendered => {
    $enginesSection.innerHTML = rendered;
    links = new Links($all`.engines .icon-link`);
    links.init(tab.id, keyword.value);
  }).then(() => {
    new Mason($`.engines`, {
      itemSelector: '.pin',
      columnNum: 2
    });
  }).catch(errorHandler);

  getKeyword(tabUrl).then(keywords => {
    clog('get keywords: ', JSON.stringify(keywords));
    // @TODO if input is not empty, cancel getKeyWord and don't change input and link
    // @TODO add all keywords to auto-complete suggestion list
    keyword.placeholder = keywords[0].word.trim();
    return null;
  }).catch(errorHandler);

});

/**
 * @param {String} str
 * */
async function translate(str) {
  str = str.trim().replace(/\n/, '') || '';
  // @TODO only translate some language, from user config
  // @TODO not translate some language, from user config
  // if(chrome.i18n.detect)
  if (str.length > CONFIG.translateMaxLength) {
    return Promise.reject(new popupErr('Translation: String too long: ' + str));
  }

  let lang = navigator.language.split('-', 1)[0];
  let resultObj = await tjs.translate({
    api: CONFIG.devMode
      ? 'GoogleCN'
      : (navigator.language === 'zh-CN' ? 'BaiDu' : 'Google'),
    text: str,
    to: CONFIG.devMode
      ? 'zh-CN'
      : (lang === 'zh' ? navigator.language : lang)
  });
  if (resultObj.error) return null;

  let translated = resultObj.detailed || resultObj.result;
  if(isEmpty(filterEmptyStr(translated))) return '';

  return translated.filter(line => {
    return line.toLowerCase() !== str.toLowerCase();
  }).reduce((html, line) => {
    html += line + '\n';
    return html;
  }, '');
}
