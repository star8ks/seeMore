import {isEmpty, debounce} from 'lodash';
import tjs from './translation';
import CONFIG from '../common/config';
import {clog, $, filterEmptyStr, onceLoaded, getCurrentTab, btnCode, getMouseButton, minErr, deepValue} from '../common/base';
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
  constructor($linksWrapper, tabId) {
    this.$linksWrapper = $linksWrapper;
    this.$links = this.$linksWrapper.querySelectorAll('.icon-link');
    this.$defaultLink = null;
    this.setDefaultLink();
    this._init(tabId);
  }

  _init(tabId) {
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
      if(this.$defaultLink === null) {
        this._setDefaultLink(this.$links[0]);
      }
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

class SearchBox {
  suggestions = [];
  constructor($keyword, engines, selectEngineFn) {
    this.$el = $keyword;
    this.engines = engines;
    this.suggestions.concat(deepValue(engines));
    this.$el.focus();
    this.$el.addEventListener('keydown', e => {
      if(e.key === 'Tab') {
        // TODO serarch in this.sugesstion, and autocomplete by press Tab
        e.preventDefault();
      }
    });
    this.$el.addEventListener('input', debounce(() => this._onInput(selectEngineFn), 500));
  }

  _onInput(selectEngineFn) {
    if(this.engineSelector !== '') {
      let engine = this.engines.find(engine => {
        return engine.displayName.startsWith(this.engineSelector) || engine.$$key.startsWith(this.engineSelector);
      });
      selectEngineFn(engine ? engine.$$key : '');
    }
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

  static engineSelectorRegex = /(?:^|\s)([^\s]+)$/;

  get value() {
    return this.$el.value;
  }
  set placeholder(val) {
    this.$el.placeholder = val;
    this._onInput();
  }
  get engineSelector() {
    let match = this.$el.value.match(SearchBox.engineSelectorRegex);
    return match ? match[1] : '';
  }
}

onceLoaded(getCurrentTab).then(async (tab) => {
  let tabUrl = new Url(tab.url);
  let $translation = $`.translation`;
  let engineListTpl = $`#tpl-engines`.innerHTML.trim();
  let $enginesSection = $`.engines`;

  getKeyword(tabUrl).then(keywords => {
    clog('get keywords: ', JSON.stringify(keywords));
    // @TODO if input is not empty, cancel getKeyWord and don't change input and link
    // @TODO add all keywords to auto-complete suggestion list
    keywords.forEach(kw => searchBox.suggestions.push(kw.word.trim()));
    searchBox.placeholder = keywords[0].word.trim();
    return null;
  }).catch(errorHandler);

  $enginesSection.innerHTML = await Render.openEngines(engineListTpl);

  let links = new Links($`.engines`, tab.id);
  let engines = await Engine.getOpen(Engine.returnType.normal, null, ['displayName', '$$key']);
  let searchBox = new SearchBox($`#keyword`, engines, engineKey => links.setDefaultLink(engineKey));

  searchBox.onKeyup(e => {
    if(e.key === 'Enter') {
      links.$defaultLink.dispatchEvent(new MouseEvent(
        'click',
        {button: btnCode.left}
      ));
    }
  });
  searchBox.onUpdated(e => {
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
