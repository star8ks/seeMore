import {isEmpty} from 'lodash';
import Mason from '../common/Mason';
import {getMouseButton} from '../common/base';
class Links {
  static selectors = {
    link: '.engines__item'
  };
  static statusClass = {
    defaultLink: 'engines__item--default',
    tempSelected: 'engines__item--temp',
  };

  constructor($linksWrapper, tabId) {
    this.$linksWrapper = $linksWrapper;
    this.$links = this.$linksWrapper.querySelectorAll(Links.selectors.link);
    this.$defaultLink = null;
    this.setDefaultLink();
    this.render();
    this._init(tabId);
  }

  render() {
    new Mason(this.$linksWrapper, {
      itemSelector: '.pin',
      columnNum: 2
    });
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
    if (!searchWord) return new Error('invalid param: updateLinkHref with empty string');
    this.$links.forEach($link => {
      $link.href = $link.getAttribute('data-url').replace(/%s/g, encodeURIComponent(searchWord));
    });
  }

  _setDefaultLink($link) {
    if ($link === null) return;
    if (this.$defaultLink) {
      this.$defaultLink.classList.remove(Links.statusClass.defaultLink);
    }
    this.$defaultLink = $link;
    this.$defaultLink.classList.add(Links.statusClass.defaultLink);
  }

  _searchLink(engineName) {
    engineName = engineName.toLowerCase();
    for (let $link of this.$links) {
      if ($link.getAttribute('data-se').toLowerCase() === engineName) {
        return $link;
      }
    }
    return null;
  }

  setDefaultLink(engineName) {
    if (isEmpty(engineName)) {
      if (this.$defaultLink === null) {
        this._setDefaultLink(this.$links[0]);
      }
      return;
    }
    this._setDefaultLink(this._searchLink(engineName));
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
    let nextDefaultLink = nextUl.querySelector(Links.selectors.link);
    nextDefaultLink && this._setDefaultLink(nextDefaultLink);
  }

  /**
   * set another same type link as $defaultLink
   * @param engineName
   */
  setDefaultLinkSameType(engineName) {
    let $link = this._searchLink(engineName);
    if ($link === null) return;
    $link.classList.add(Links.statusClass.tempSelected);

    let ul = $link.parentElement.parentElement;
    if(ul.querySelectorAll(Links.selectors.link).length > 1) {
      let defaultLink = ul.querySelector(`${Links.selectors.link}:not(.${Links.statusClass.tempSelected})`);
      defaultLink && this._setDefaultLink(defaultLink);
    }

    $link.classList.remove(Links.statusClass.tempSelected);
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

export default Links;