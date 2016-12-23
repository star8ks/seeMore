import _ from 'lodash';
import tjs from './translation';
import CONFIG from '../common/config';
import {clog, $, $all, filterEmptyStr, onceLoaded, getCurrentTab, getMouseButton, minErr} from "../common/base";
import Url from '../common/Url';
import Render from '../common/Render';
import Mason from '../common/Mason';
import getKeyword from './keyword';

tjs.add(new tjs.BaiDu());
tjs.add(new tjs.Google());
if(CONFIG.devMode) tjs.add(new tjs.GoogleCN());

var popupErr = minErr('Popup');

/**
 * @param {Error} e
 * */
function errorHandler(e) {
  clog.err(e.toString());
  //noinspection JSUnresolvedVariable
  clog.err('Error stack: ', e.stack);
}

var Links = function ($links) {
  this.$links = $links;
};
Links.prototype.init = function (tabId) {
  this.$links.forEach(function ($link) {
    // set icons
    $link.style.backgroundImage = "url('" + $link.getAttribute('data-favicon') + "')";

    $link.onclick = function (evt) {
      var button = getMouseButton(evt);
      switch (button) {
        case 'left':
          chrome.tabs.update(tabId, {url: this.href});
          break;
        case 'middle':
          chrome.tabs.create({url: this.href});
          break;
        default:
          break;
      }
      evt.preventDefault();
    }
  });
};
Links.prototype.updateHref = function (searchWord) {
  if (!searchWord) return popupErr('invalid param', 'updateLinkHref with empty string');
  this.$links.forEach(function ($link) {
    $link.href = $link.getAttribute('data-url').replace(/%s/g, encodeURIComponent(searchWord));
  });
};

onceLoaded(getCurrentTab).then(function onLoad(tab) {
  var tabUrl = new Url(tab.url);
  var $keyword = $`#keyword`;
  var $translation = $`.translation`;
  var links;
  var engineListTpl = $`#tpl-engines`.innerHTML.trim();
  var $enginesSection = $`.engines`;

  $keyword.focus();
  $keyword.addEventListener('input', _.debounce(function (e) {
    //if press enter, search word using first enabled engine
    if(e.key === 'Enter') {
      $`.se:not(.disable)`.dispatchEvent(new MouseEvent(
        'click',
        {button: 0}
      ));
    }
    onKeywordUpdate(this.value);
  }, 500));

  Render.openEngines(engineListTpl).then(function (rendered) {
    $enginesSection.innerHTML = rendered;
    links = new Links($all`.engines .icon-link`);
  }).then(function () {
    new Mason($`.engines`, {
      itemSelector: '.pin',
      columnNum: 2
    });
    links.init(tab.id, $keyword.value);
  }).catch(errorHandler);

  getKeyword(tabUrl).then(function (keywords) {
    clog('get keywords: ', JSON.stringify(keywords));
    var displayStr = keywords[0].word.trim();
    // @TODO if input is not empty, cancel getKeyWord and don't change input and link
    // @TODO add all keywords to auto-complete suggestion list
    $keyword.value = displayStr;
    onKeywordUpdate(displayStr);
    if (displayStr && links) links.updateHref(displayStr);
    return null;
  }).catch(errorHandler);

  /**
   * @param {String} str
   * */
  function translate(str) {
    str = str.trim() || '';
    // @TODO only translate some language, from user config
    // @TODO not translate some language, from user config
    // if(chrome.i18n.detect)
    if (str.length > CONFIG.translateMaxLength) {
      return Promise.reject(popupErr('Translation', 'String too long: ' + str));
    }

    var lang = navigator.language.split('-', 1)[0];
    return tjs.translate({
      api: CONFIG.devMode
        ? 'GoogleCN'
        : (navigator.language === 'zh-CN' ? 'BaiDu' : 'Google'),
      text: str,
      to: lang === 'zh' ? navigator.language : lang
    }).then(function (resultObj) {
      if (resultObj.error) return null;
      return resultObj.detailed || resultObj.result;
    }).then(function (translated) {
      return _.isEmpty(filterEmptyStr(translated)) ? '' : translated.filter(function (line) {
        return line.toLowerCase() !== str.toLowerCase();
      }).reduce(function (html, line) {
        html += line + '\n';
        return html;
      }, '');
    });
  }

  function onKeywordUpdate(searchString) {
    clog('translate ', searchString);
    if (searchString) {
      translate(searchString).then(function (html) {
        $translation.innerText = html;
      }).catch(errorHandler);
    }
    links && links.updateHref(searchString);
  }

});