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
  constructor({$keyword, engines, selectEngineFn = null, onKeyup = null, onKeydown = null, onUpdated = null}) {
    this.$el = $keyword;
    this.engines = engines;
    this.suggestions.concat(deepValue(engines));
    this.$el.focus();
    this.defaultPlaceholder = this.$el.placeholder;
    this.$el.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        // TODO serarch in this.sugesstion, and autocomplete by press Tab
        if (this.value === '' && this.$el.placeholder !== '') {
          this.$el.value = this.$el.placeholder;
        }
        e.preventDefault();
      }
    });
    selectEngineFn && this.$el.addEventListener('input', debounce(() => this._onInput(selectEngineFn), 500));
    onKeyup && this.addKeyupHandler(onKeyup);
    onKeydown && this.addKeydownHandler(onKeydown);
    onUpdated && this.addUpdatedHandler(onUpdated);
  }

  _onInput(selectEngineFn) {
    if (this.engineSelector !== '') {
      let engineSelectorLower = this.engineSelector.toLowerCase();
      let engine = this.engines.find(engine => {
        return engine.displayName.toLowerCase().startsWith(engineSelectorLower) || engine.$$key.toLowerCase().startsWith(engineSelectorLower);
      });
      if(!engine) return;

      // TODO: if next input is not Tab, clear tip and remove listener
      this.$el.parentNode.querySelector('.tip').innerText = `Press Tab to use ${engine.displayName}`;
      let handler = e => {
        if (e.key === 'Tab') {
          selectEngineFn(engine ? engine.$$key : '');
          this.$el.parentNode.querySelector('.tip').innerText = '';
          this.$el.removeEventListener('keydown', handler);
        }
      };
      this.addKeydownHandler(handler);
    }
    this.$el.dispatchEvent(new CustomEvent(
      'keywordUpdated',
      {detail: this.value || this.$el.placeholder}
    ));
  }

  addUpdatedHandler(fn) {
    this.$el.addEventListener('keywordUpdated', fn);
  }

  addKeyupHandler(fn) {
    this.$el.addEventListener('keyup', fn);
  }

  addKeydownHandler(fn) {
    this.$el.addEventListener('keydown', fn);
  }

  static engineSelectorRegex = /(?:^|\s)([^\s]+)$/;

  get value() {
    return this.$el.value;
  }

  get placeholder() {
    return this.$el.placeholder;
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

export default SearchBox;