import {deepValue} from '../common/base';
import {debounce} from 'lodash';

class SearchBox {
  suggestions = [];

  /**
   * @param {HTMLInputElement} $keyword
   * @param {Array} engines
   * @param {Function} selectEngineFn
   * @param {Function} onKeyup
   * @param {Function} onKeydown
   * @param {Function} onUpdated
   */
  constructor({$element, engines, selectEngineFn = null, onKeyup = null, onKeydown = null, onUpdated = null}) {
    this.$keyword = $element.querySelector('.searchBox__input');
    this.$translation = $element.querySelector('.searchBox__translation');
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
    onKeyup && this.addKeyupHandler(onKeyup);
    onKeydown && this.addKeydownHandler(onKeydown);
    onUpdated && this.addUpdatedHandler(onUpdated);
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
      if(!engine) return;

      // TODO: if next input is not Tab, clear tip and remove listener
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

  static engineSelectorRegex = /(?:^|\s)([^\s]+)$/;

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
}

export default SearchBox;