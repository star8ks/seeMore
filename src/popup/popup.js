import {isEmpty, debounce} from 'lodash';
import tjs from './translation';
import CONFIG from '../common/config';
import {clog, $, filterEmptyStr, onceLoaded, getCurrentTab, btnCode, getMouseButton, minErr} from '../common/base';
import Url from '../common/Url';
import Render from '../common/Render';
import Mason from '../common/Mason';
import getKeyword from './keyword';
import Engine from '../common/db/Engine';

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
  static defaultLinkClass = 'icon-link-default';
  constructor($linksWrapper) {
    this.$linksWrapper = $linksWrapper;
    this.$links = this.$linksWrapper.querySelectorAll('.icon-link');
    this.$defaultLink = null;
    this.setDefaultLink();
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

  _setDefaultLink($link) {
    if(this.$defaultLink) {
      this.$defaultLink.classList.remove(Links.defaultLinkClass);
    }
    this.$defaultLink = $link;
    this.$defaultLink.classList.add(Links.defaultLinkClass);
  }

  setDefaultLink(seName) {
    if(isEmpty(seName)) {
      this._setDefaultLink(this.$links[0]);
      return;
    }
    seName = seName.toLowerCase();
    for(let $link of this.$links) {
      if($link.getAttribute('data-se').toLowerCase() === seName) {
        this._setDefaultLink($link);
        break;
      }
    }
  }
}

class Keyword {
  suggestions = [];
  constructor($keyword) {
    this.$el = $keyword;
    this.$el.focus();
    this.$el.addEventListener('keydown', e => {
      if(e.key === 'Tab') {
        // TODO serarch in this.sugesstion, and autocomplete by press Tab
        e.preventDefault();
      }
    });
    this.$el.addEventListener('input', debounce(() => this.dispatchEvent(), 500));
  }

  dispatchEvent() {
    this.$el.dispatchEvent(new CustomEvent(
      'keywordUpdated',
      {detail: this.value || this.$el.placeholder}
    ));
  }

  onUpdated(fn) {
    this.$el.addEventListener('keywordUpdated', fn);
  }

  onKeyup(fn) {
    this.$el.addEventListener('keyup', fn);
  }

  static engineSelectorRegex = /(?:^|\s)([^\s]+)/;

  get value() {
    return this.$el.value.replace(Keyword.engineSelectorRegex, '').trim();
  }
  set placeholder(val) {
    this.$el.placeholder = val;
    this.dispatchEvent();
  }
  get engineSelector() {
    let match = this.$el.value.match(Keyword.engineSelectorRegex);
    return match ? match[1] : '';
  }
}

onceLoaded(getCurrentTab).then(async (tab) => {
  let tabUrl = new Url(tab.url);
  let keyword = new Keyword($`#keyword`);
  let $translation = $`.translation`;
  let links;
  let engineListTpl = $`#tpl-engines`.innerHTML.trim();
  let $enginesSection = $`.engines`;

  getKeyword(tabUrl).then(keywords => {
    clog('get keywords: ', JSON.stringify(keywords));
    // @TODO if input is not empty, cancel getKeyWord and don't change input and link
    // @TODO add all keywords to auto-complete suggestion list
    // keywords.forEach(kw => keyword.suggestions.push(kw.word.trim()));
    keyword.placeholder = keywords[0].word.trim();
    return null;
  }).catch(errorHandler);

  let rendered = await Render.openEngines(engineListTpl);
  $enginesSection.innerHTML = rendered;

  links = new Links($`.engines`);
  links.init(tab.id, keyword.value);

  keyword.onKeyup(e => {
    if(e.key === 'Enter') {
      links.$defaultLink.dispatchEvent(new MouseEvent(
        'click',
        {button: btnCode.left}
      ));
    }
  });
  keyword.onUpdated(e => {
    let searchString = e.detail.trim();
    clog('translate ', searchString);

    if (searchString) {
      links.updateHref(searchString);
      if(searchString.length <= CONFIG.translateMaxLength) {
        translate(searchString).then(html => {
          $translation.innerText = html;
        }).catch(errorHandler);
      }
    }

    if(keyword.engineSelector === '') return;
    Engine.getOpen(true, engine => {
      return engine.displayName.startsWith(keyword.engineSelector) || engine.$$key.startsWith(keyword.engineSelector);
    }).then(engines => {
      let engineNames = Object.keys(engines);
      return isEmpty(engineNames)
        ? Promise.reject()
        : links.setDefaultLink(engineNames[0]);
    });
  });
  new Mason($`.engines`, {
    itemSelector: '.pin',
    columnNum: 2
  });
}).catch(errorHandler);

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
