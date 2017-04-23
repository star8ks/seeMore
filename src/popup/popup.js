import {
  clog,
  $,
  onceLoaded,
  getCurrentTab,
  btnCode
} from '../common/base';
import Url from '../common/Url';
import Render from '../common/Render';
import Mason from '../common/Mason';
import getKeyword from './keyword';
import Engine from '../common/db/Engine';
import SearchBox from './SearchBox';
import Links from './Links';


/**
 * @param {Error} e
 **/
function errorHandler(e) {
  //noinspection JSUnresolvedVariable
  clog.err(e.toString());
  clog.err('Error stack: ', e.stack);
}

onceLoaded(getCurrentTab).then(async function (tab) {
  let tabUrl = new Url(tab.url);
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
  Engine.searchKeys(tabUrl.host, {includeRootDomain: true}).then(keys => {
    // TODO if keys.length <= 0, look for history and see which engine will be more likely selected
    keys.length && links.setDefaultLinkSameType(keys[0]);
  });

  let engines = await Engine.getOpen({
    returnType: Engine.returnType.normal,
    fields: ['displayName', '$$key']
  });
  var searchBox = new SearchBox({
    $element: $`.searchBox`,
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
    onUpdated: function(e) {
      let searchString = e.detail.trim();
      if (searchString === searchBox.defaultPlaceholder || !searchString) {
        return;
      }
      clog('translate ', searchString);

      links.updateHref(searchString);
    }
  });

  new Mason($`.engines`, {
    itemSelector: '.pin',
    columnNum: 2
  });
}).catch(errorHandler);