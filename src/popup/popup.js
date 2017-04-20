import {isEmpty} from 'lodash';
import tjs from './translation';
import CONFIG from '../common/config';
import {
  clog,
  $,
  filterEmptyStr,
  onceLoaded,
  getCurrentTab,
  btnCode,
  getMouseButton,
  minErr
} from '../common/base';
import Url from '../common/Url';
import Render from '../common/Render';
import Mason from '../common/Mason';
import getKeyword from './keyword';
import Engine from '../common/db/Engine';
import SearchBox from './SearchBox';

tjs.add(new tjs.BaiDu());
tjs.add(new tjs.Google());
if (CONFIG.devMode) tjs.add(new tjs.GoogleCN());

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

  get defaultLinkIndex() {
    return Array.from(this.$links).indexOf(this.$defaultLink);
  }

  updateHref(searchWord) {
    if (!searchWord) return new popupErr('invalid param: updateLinkHref with empty string');
    this.$links.forEach($link => {
      $link.href = $link.getAttribute('data-url').replace(/%s/g, encodeURIComponent(searchWord));
    });
  }

  _setDefaultLink($link) {
    if (this.$defaultLink) {
      this.$defaultLink.classList.remove(Links.defaultLinkClass);
    }
    this.$defaultLink = $link;
    this.$defaultLink.classList.add(Links.defaultLinkClass);
  }

  setDefaultLink(seName) {
    if (isEmpty(seName)) {
      if (this.$defaultLink === null) {
        this._setDefaultLink(this.$links[0]);
      }
      return;
    }
    seName = seName.toLowerCase();
    for (let $link of this.$links) {
      if ($link.getAttribute('data-se').toLowerCase() === seName) {
        this._setDefaultLink($link);
        break;
      }
    }
  }

  setPrevDefaultLink() {
    let currentIndex = this.defaultLinkIndex;
    let $link = (currentIndex >= 1) ? this.$links[currentIndex - 1] : this.$links[this.$links.length - 1];
    this._setDefaultLink($link);
  }

  setNextDefaultLink() {
    let currentIndex = this.defaultLinkIndex;
    let $link = (currentIndex >= this.$links.length - 1) ? this.$links[0] : this.$links[currentIndex + 1];
    this._setDefaultLink($link);
  }

  setRightDefaultLink() {
    let currentUl = this.$defaultLink.parentElement.parentElement;
    let nextUl = currentUl.nextElementSibling || currentUl.parentElement.firstElementChild;
    let nextDefaultLink = nextUl.querySelector('a');
    nextDefaultLink && this._setDefaultLink(nextDefaultLink);
  }
}

/*class ResultList {
 constructor($listWrapper, tabId, results) {
 this.$listWrapper = $listWrapper;
 results.forEach(result => this.add(result));
 }

 moveToHead() {}
 add() {}
 }
 // result item
 class Result {
 innerHtml = '';
 constructor() {}
 onSelect() {}
 onTab() {}
 onEnter() {}
 render() {}
 }
 class TextResult extends Result {}
 class LinkResult extends Result {}*/

onceLoaded(getCurrentTab).then(async function (tab) {
  let tabUrl = new Url(tab.url);
  let $translation = $`.translation`;
  let engineListTpl = $`#tpl-engines`.innerHTML.trim();
  let $enginesSection = $`.engines`;

  getKeyword(tabUrl).then(keywords => {
    clog('get keywords: ', JSON.stringify(keywords));
    // @TODO if input is not empty, cancel getKeyWord and don't change input and link
    // @TODO add all keywords to auto-complete suggestion list
    if (typeof searchBox === 'undefined') {
      return;
    }
    keywords.forEach(kw => searchBox.suggestions.push(kw.word.trim()));
    let newPlaceholder = keywords[0].word.trim();
    if (newPlaceholder) searchBox.placeholder = newPlaceholder;
    return null;
  }).catch(errorHandler);

  $enginesSection.innerHTML = await Render.openEngines(engineListTpl);

  let links = new Links($`.engines`, tab.id);
  let engines = await Engine.getOpen(Engine.returnType.normal, null, ['displayName', '$$key']);
  var searchBox = new SearchBox({
    $keyword: $`#keyword`,
    engines: engines,
    selectEngineFn: engineKey => links.setDefaultLink(engineKey),
    onKeyup: e => {
      if (e.key === 'Enter') {
        links.$defaultLink.dispatchEvent(new MouseEvent(
          'click',
          {button: btnCode.left}
        ));
      }
    },
    onKeydown: e => {
      if(e.key === 'ArrowDown') {
        links.setNextDefaultLink();
      } else if(e.key === 'ArrowUp') {
        links.setPrevDefaultLink();
      } else if(e.key === 'ArrowRight') {
        links.setRightDefaultLink();
      }
    },
    onUpdated: async (e) => {
      let searchString = e.detail.trim();
      if (searchString === searchBox.defaultPlaceholder || !searchString) {
        return;
      }
      clog('translate ', searchString);

      links.updateHref(searchString);
      if (searchString.length <= CONFIG.translateMaxLength) {
        $translation.innerText = await translate(searchString);
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
    api: /*CONFIG.devMode
     ? 'GoogleCN'
     :*/ (navigator.language === 'zh-CN' ? 'BaiDu' : 'Google'),
    text: str,
    to: CONFIG.devMode
      ? 'zh-CN'
      : (lang === 'zh' ? navigator.language : lang)
  });
  if (resultObj.error) return null;

  let translated = resultObj.detailed || resultObj.result;
  if (isEmpty(filterEmptyStr(translated))) return '';

  return translated.filter(line => {
    return line.toLowerCase() !== str.toLowerCase();
  }).reduce((html, line) => html + line + '\n', '');
}
