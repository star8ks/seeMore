;(function (window, Mustache, Url, Engine, EngineType, Icon) {
  function setProperties(engines) {
    return Promise.map(engines, function (se) {
      var oUrl = new Url(se.url);
      se.index = se['$$key'];
      return Icon.get(oUrl.host).then(function (url) {
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

  window.Render = {
    openEngines: function (template) {
      return EngineType.getAllReal().map(function (typeObj) {
        var typeId = typeObj['$$key'];
        return Engine.getOpen(false, function (engine) {
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
        return Engine.getSortedAll(false, function (engine) {
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
})(window, Mustache, Url, Engine, EngineType, Icon);