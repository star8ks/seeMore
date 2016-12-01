import DB from './DB';

let EngineType = new DB(localforage, 'engineType');
EngineType.getAllDefault = function () {
  return this.getAll(true).then(function (types) {
    return types.filter(function (type) {
      return type.default;
    }).sort(function (typeA, typeB) {
      return typeA.order - typeB.order;
    });
  });
};
EngineType.getAllReal = function () {
  return this.getAll(true).then(function (types) {
    return types.filter(function (type) {
      return !type.default;
    }).sort(function (typeA, typeB) {
      return typeA.order - typeB.order;
    });
  });
};

export default EngineType;