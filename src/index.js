var Dispatcher = function () {
  var _has = function (obj, prop, error) {
    if (!(prop in obj)) throw new Error(error);
    return true;
  };

  return {
    _stores: [],
    register: function (store) {
      if (_has(store, 'update', 'Every store should implement an `update` method')) {
        var consumers = [];
        var change = function () {
          consumers.forEach(function (l) { 
            l(store);
          });
        };
        var subscribe = function (consumer, noInit) {
          consumers.push(consumer);
          !noInit ? consumer(store) : null;
        };
        
        this._stores.push({ store: store, change: change });
        return subscribe;
      }
      return false;
    },
    dispatch: function (action) {
      if (this._stores.length > 0) {
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
    var _valid = function (value, error) {
      if (!value) throw new Error(error);
      return true;
    };

    return {
      createAction: function (type) {
        if (_valid(type, 'Please, provide action\'s type.')) {
          return function (payload) {
            return dispatcher.dispatch({ type: type, payload: payload });
          }
        }
      },
      createSubscriber: function (store) {
        return dispatcher.register(store);
      }
    }
  }
};
