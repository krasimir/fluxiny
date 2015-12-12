var Dispatcher = function () {
  var _has = function (obj, prop, error) {
    if (!(prop in obj)) throw new Error(error);
    return true;
  };

  return {
    constructor: function () {
      this._stores = [];
    },
    register: function (store) {
      if (_has(store, 'update', 'Every store should implement an `update` method')) {
        var listeners = [];
        var subscribe = function (listener) { listeners.push(listener); };
        var change = function (data) {
          listeners.forEach(function (l) { 
            l(data); 
          });
        };
        
        this._stores.push({ store: store, change: change });
        return subscribe;
      }
      return false;
    },
    dispatch: function (action) {
      if (
        _has(action, 'type', 'Every action should have a `type` property') &&
        _has(action, 'payload', 'Every action should have a `payload` property')
      ) {
        this._stores.forEach(function (entry) {
          entry.store.update(action, entry.change);
        });
      }
    }
  }
};

module.exports = {
  create: function () {
    var dispatcher = Dispatcher();

    return {
      dispatcher: dispatcher,
      createAction: function (type) {
        return function (payload) {
          return dispatcher.dispatch({ type: type, payload: payload });
        }
      }
    }
  }
};
