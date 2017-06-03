import {
  clog,
  $,
  onceLoaded,
  getCurrentTab,
  btnCode
} from '../common/base';
import Url from '../common/Url';
import Render from '../common/Render';
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

  return Promise.all([
    getKeyword(tabUrl),
    Render.openEngines(engineListTpl)
  ]).spread(async (keywords, html) => {
    $enginesSection.innerHTML = html;
    let links = new Links($`.engines`, tab.id);
    tabUrl.isNormal && Engine.searchKeys(tabUrl.host, {includeRootDomain: true}).then(keys => {
      // TODO if keys.length <= 0, look for history and see which engine will be more likely selected
      keys.length && links.setDefaultLinkSameType(keys[0]);
    });

    let searchBox = new SearchBox({
      $element: $`.searchBox`,
      engines: await Engine.getOpen({
        returnType: Engine.returnType.normal,
        fields: ['displayName', '$$key']
      }),
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
        }
      },
      onUpdated: function(e) {
        let searchString = e.detail.trim();
        if (searchString === searchBox.placeholder || !searchString) {
          return;
        }
        clog('translate ', searchString);

        links.updateHref(searchString);
      }
    });

    clog('get keywords: ', JSON.stringify(keywords));
    // @TODO if input is not empty, cancel getKeyWord and don't change input and link
    // @TODO add all keywords to auto-complete suggestion list
    if (typeof searchBox === 'undefined') {
      clog('no searchBox');
      return;
    }
    keywords.forEach(kw => searchBox.suggestions.push(kw.word.trim()));
    let newPlaceholder = keywords[0].word.trim();
    if (newPlaceholder) searchBox.placeholder = newPlaceholder;
  });


}).catch(errorHandler);