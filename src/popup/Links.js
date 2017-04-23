import {isEmpty} from 'lodash';
import {getMouseButton} from '../common/base';
class Links {
  static selectors = {
    links: '.engines__item'
  };
  static statusClass = {
    defaultLink: 'icon-link-default'
  };

  constructor($linksWrapper, tabId) {
    this.$linksWrapper = $linksWrapper;
    this.$links = this.$linksWrapper.querySelectorAll(Links.selectors.links);
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
    if (!searchWord) return new Error('invalid param: updateLinkHref with empty string');
    this.$links.forEach($link => {
      $link.href = $link.getAttribute('data-url').replace(/%s/g, encodeURIComponent(searchWord));
    });
  }

  _setDefaultLink($link) {
    if (this.$defaultLink) {
      this.$defaultLink.classList.remove(Links.statusClass.defaultLink);
    }
    this.$defaultLink = $link;
    this.$defaultLink.classList.add(Links.statusClass.defaultLink);
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

export default Links;