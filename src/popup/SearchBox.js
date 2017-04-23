import {deepValue, filterEmptyStr, minErr} from '../common/base';
import {debounce, isEmpty} from 'lodash';
import tjs from './translation';
import CONFIG from '../common/config';

let searchBoxErr = minErr('searchBox');
class SearchBox {
  static engineSelectorRegex = /(?:^|\s)([^\s]+)$/;
  static selectors = {
    keyword: '.searchBox__input',
    translation: '.searchBox__translation',
  };
  static statusClass = {
    hide: 'searchBox__translation--hide'
  };
  suggestions = [];

  /**
   * @param {HTMLElement} $element
   * @param {Array} engines
   * @param {Function} selectEngineFn
   * @param {Function} onKeyup
   * @param {Function} onKeydown
   * @param {Function} onUpdated
   */
  constructor({$element, engines, selectEngineFn = null, onKeyup = null, onKeydown = null, onUpdated = null}) {
    this.$keyword = $element.querySelector(SearchBox.selectors.keyword);
    this.$translation = $element.querySelector(SearchBox.selectors.translation);
    this._$translationText = this.$translation.querySelector('span');
    this.$tip = $element.querySelector('.searchBox__tip');
    this.engines = engines;
    this.suggestions.concat(deepValue(engines));
    this.$keyword.focus();
    this.defaultPlaceholder = this.$keyword.placeholder;
    this.$keyword.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        // TODO serarch in this.sugesstion, and autocomplete by press Tab
        if (this.value === '' && this.$keyword.placeholder !== '') {
          this.$keyword.value = this.$keyword.placeholder;
        }
        e.preventDefault();
      }
    });
    selectEngineFn && this.$keyword.addEventListener('input', debounce(() => this._onInput(selectEngineFn), 500));

    this.addUpdatedHandler(e => {
      let searchString = e.detail.trim();
      if (searchString === this.defaultPlaceholder || !searchString) {
        return;
      }
      if (searchString.length <= CONFIG.translateMaxLength) {
        return this.translate(searchString);
      }
    });

    onKeyup && this.addKeyupHandler(onKeyup);
    onKeydown && this.addKeydownHandler(onKeydown);
    onUpdated && this.addUpdatedHandler(onUpdated);

    tjs.add(new tjs.BaiDu());
    tjs.add(new tjs.Google());
    if (CONFIG.devMode) tjs.add(new tjs.GoogleCN());
  }

  _onInput(selectEngineFn) {
    this.$keyword.dispatchEvent(new CustomEvent(
      'keywordUpdated',
      {detail: this.value || this.$keyword.placeholder}
    ));

    if (this.engineSelector !== '') {
      let engineSelectorLower = this.engineSelector.toLowerCase();
      let engine = this.engines.find(engine => {
        return engine.displayName.toLowerCase().startsWith(engineSelectorLower) || engine.$$key.toLowerCase().startsWith(engineSelectorLower);
      });
      if (!engine) return;

      // TODO: if next input is not Tab, or not match any engine, clear tip and remove listener
      this.$tip.innerText = `Press Tab to use ${engine.displayName}`;
      let handler = e => {
        if (e.key === 'Tab') {
          selectEngineFn(engine ? engine.$$key : '');
          this.$tip.innerText = '';
          this.$keyword.removeEventListener('keydown', handler);
        }
      };
      this.addKeydownHandler(handler);
    }
  }

  addUpdatedHandler(fn) {
    this.$keyword.addEventListener('keywordUpdated', fn);
  }

  addKeyupHandler(fn) {
    this.$keyword.addEventListener('keyup', fn);
  }

  addKeydownHandler(fn) {
    this.$keyword.addEventListener('keydown', fn);
  }

  get value() {
    return this.$keyword.value;
  }

  get placeholder() {
    return this.$keyword.placeholder;
  }

  set placeholder(val) {
    this.$keyword.placeholder = val;
    this._onInput();
  }

  get engineSelector() {
    let match = this.$keyword.value.match(SearchBox.engineSelectorRegex);
    return match ? match[1] : '';
  }

  set translationText(text) {
    if(text.length > 0) {
      this.$translation.classList.remove(SearchBox.statusClass.hide);
    } else {
      this.$translation.classList.add(SearchBox.statusClass.hide);
    }
    this._$translationText.innerText = text;
  }

  /**
   * @param {String} str
   * */
  async translate(str) {
    str = str.trim().replace(/\n/, '') || '';
    // @TODO only translate some language, from user config
    // @TODO not translate some language, from user config
    // if(chrome.i18n.detect)
    if (str.length > CONFIG.translateMaxLength) {
      return Promise.reject(new Error('Translation: String too long: ' + str));
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
    if (resultObj.error) return new searchBoxErr('translate error:' + resultObj.error);

    let translated = resultObj.detailed || resultObj.result;
    if (isEmpty(filterEmptyStr(translated))) return;

    this.translationText = translated.filter(line => {
      return line.toLowerCase() !== str.toLowerCase();
    }).reduce((html, line) => html + line + '\n', '');
  }
}

export default SearchBox;