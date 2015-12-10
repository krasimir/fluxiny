var Errors = {
  STORE_MISSING_UPDATE_METHOD: 'Every store should implement an `update` method',
  ACTION_MISSING_TYPE: 'Every action should have a `type` property',
  ACTION_MISSING_PAYLOAD: 'Every action should have a `payload` property'
};

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
      if (_has(store, 'update', STORE_MISSING_UPDATE_METHOD)) {
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
        _has(action, 'type', ACTION_MISSING_TYPE) &&
        _has(action, 'payload', ACTION_MISSING_PAYLOAD)
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
