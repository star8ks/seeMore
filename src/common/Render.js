import Mustache from 'mustache';
import Url from '../common/Url';
import Engine from '../common/db/Engine';
import EngineType from '../common/db/EngineType';
import Icon from '../common/db/Icon';
import clog from './base/clog';
import minErr from './base/minErr';

let renderErr = minErr('Render');

function setProperties(engines) {
  return Promise.map(engines, function (se) {
    let oUrl = new Url(se.url);
    se.index = se['$$key'];
    se.href = se.url.replace(/%s/g, '');

    return Icon.search(oUrl.host).then(function (url) {
      // get data URI from yandex favicon url may take long time
      // so don't add to promise chain.
      url || Url.toDataURI(oUrl.yandexFaviconUrl).then(function (dataURI) {
        if (!Url.isInvalidFavicon(dataURI)) {
          clog('Update favicon of:', oUrl.host, dataURI);
          Icon.set(oUrl.host, dataURI);
          return dataURI;
        }
        clog('invalid favicon', dataURI);
        return '';
      }).catch(e => {
        clog(new renderErr('Error in setProperties' + e.toString()));
      });
      return url || oUrl.faviconUrl;
    }).then(faviconUrl => {
      se.favicon = faviconUrl;
      return se;
    });
  });
}

function renderList(engines) {
  return Mustache.render(this.template, {
    typeName: this.typeName,
    engines: engines
  });
}

let Render = {
  openEngines: function (template) {
    return EngineType.getAllReal().map(function (typeObj) {
      let typeId = typeObj['$$key'];
      return Engine.getOpen({
        returnType: Engine.returnType.normal,
        filter: function (engine) {
          return '' + engine.typeId === typeId;// key always saved as string
        }
      }).bind({
        typeName: typeObj.name,
        template: template
      })
        .then(setProperties)
        .then(renderList);
    }).then(function (lists) {
      return combineHtml(lists);
    });

  },

  defaultEngines: function (template) {
    return EngineType.getAllDefault().map(function (typeObj) {
      let typeId = typeObj['$$key'];
      return Engine.getSortedAll(Engine.returnType.normal, function (engine) {
        // if(''+engine.defaultTypeId === typeId) clog(engine.displayName, typeId, typeObj.name);
        return '' + engine.defaultTypeId === typeId;// key always saved as string
      }).bind({
        typeName: typeObj.name,
        template: template
      })
        .then(setProperties)
        .then(renderList);
    }).then(function (lists) {
      return combineHtml(lists);
    });
  }
};

function combineHtml(lists) {
  return lists.reduce((html, list) => html + list, '');
}

/** @module src/common/Render */
export default Render;