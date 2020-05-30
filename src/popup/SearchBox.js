import {deepValue, filterEmptyStr, minErr} from '../common/base';
import {debounce, isEmpty} from 'lodash';
import './chrome-youdao';
import * as tjs from 'translation.js';
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
   * @eventOrder For input element, the event order is keydown->keypress->input & updated->keyup,
   *  Handlers can get the new input element value AFTER keypress.
   *  If you press a arrow key, enter, shift, ctrl, there are no keypress and input event.
   *  See http://jsbin.com/pusicuxanu/2
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

    this.$translation.addEventListener('mouseleave', () => {
      this._hideTranslation();
    });

    this.$keyword.focus();

    this.addKeydownHandler((e) => {
      // replace $keyword value with placeholder
      if(e.key === 'Tab') {
        if(this.value === '') {
          this.$keyword.value = this.$keyword.placeholder;
          this.deactiveEngineSelect = true;
        }
        // prevent losing focus when press Tab
        e.preventDefault();
      }
    });
    selectEngineFn && this.$keyword.addEventListener('input', debounce(() => this._onInput(), 500));

    // once updated, translate it
    this.addUpdatedHandler(e => {
      let searchString = e.detail.trim();
      if (/*searchString === this.placeholder ||*/ !searchString) {
        return;
      }
      if (searchString.length <= CONFIG.translateMaxLength) {
        return this.translate(searchString);
      }
    });

    this.addKeyupHandler(this._getDefaultKeyupHandler(selectEngineFn));
    onKeyup && this.addKeyupHandler(onKeyup);
    onKeydown && this.addKeydownHandler(onKeydown);
    onUpdated && this.addUpdatedHandler(onUpdated);
  }

  _getDefaultKeyupHandler(selectEngineFn) {
    return (e) => {
      if(this.matchedEngine) {
        if (e.key === 'Tab') {
          if(!this.deactiveEngineSelect) {
            // this.deactiveEngineSelect usually means this.value is just replaced by placeholder by pressing Tab,
            // in that case, don't need to do select engine below
            // TODO search in this.suggestion, and autocomplete by press Tab
            selectEngineFn(this.matchedEngine ? this.matchedEngine.$$key : '');
            // delete engine selector from input box
            this.value = this.value.substr(0, this.value.lastIndexOf(this.engineSelector));
          } else {
            this.deactiveEngineSelect = false;
          }
        }
      } else {
        if (e.key === 'Tab') {
          // TODO: if no matched engine and press Tab, select next link by links.setNextDefaultLink();
        }
      }
      this._set$tip();
    };
  }

  /**
   * input event handler that will triggered when input sth or placeholder changed
   * @private
   */
  _onInput() {
    this.$keyword.dispatchEvent(new CustomEvent(
      'keywordUpdated',
      {detail: this.value || this.placeholder}
    ));
  }

  _set$tip() {
    this.$tip.innerText = this.matchedEngine
      ? `Press Tab to use ${this.matchedEngine.displayName}`
      : '';
  }

  /**
   * get engine selector matched engine
   * @return {Object}
   */
  get matchedEngine() {
    if(!this.engineSelector) return null;

    let engineSelectorLower = this.engineSelector.toLowerCase();
    return this.engines.find(engine => {
      return engine.displayName.toLowerCase().startsWith(engineSelectorLower) || engine.$$key.toLowerCase().startsWith(engineSelectorLower);
    }) || null;
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
  set value(val) {
    this.$keyword.value = val;
    this.$keyword.dispatchEvent(new CustomEvent(
      'keywordUpdated',
      {detail: val || this.placeholder}
    ));
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

  _hideTranslation() {
    this.$translation.classList.add(SearchBox.statusClass.hide);
  }
  _showTranslation() {
    this.$translation.classList.remove(SearchBox.statusClass.hide);
  }

  set translationText(text) {
    text.length > 0 ? this._showTranslation() : this._hideTranslation();
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
      api: 'youdao',
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
    }).reduce((html, line) => html + line + '　', '');
  }
}

export default SearchBox;