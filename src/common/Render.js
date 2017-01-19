import Mustache from 'mustache';
import Url from '../common/Url';
import Engine from '../common/db/Engine';
import EngineType from '../common/db/EngineType';
import Icon from '../common/db/Icon';

function setProperties(engines) {
  return Promise.map(engines, function (se) {
    var oUrl = new Url(se.url);
    se.index = se['$$key'];
    se.href = se.url.replace(/%s/g, '');
    // in case of too many host(like google), just search by first 3 hosts
    return Icon.search(se.hosts.slice(0, 3)).then(function (url) {
      se.favicon = url || oUrl.faviconUrl;
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
      var typeId = typeObj['$$key'];
      return Engine.getOpen(Engine.returnType.normal, function (engine) {
        return '' + engine.typeId === typeId;// key always saved as string
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
      var typeId = typeObj['$$key'];
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
  return lists.reduce(function (html, list) {
    if (list !== '') {
      html += list;
    }
    return html;
  }, '');
}

export default Render;