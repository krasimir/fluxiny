(function (root) {
    
  var Dispatcher = function () {
    return {
      _stores: [],
      register: function (store) {
        if (!store || !store.update) {
          throw new Error('You should provide a store that has an `update` method.');
        } else {
          var consumers = [];
          var change = function () {
            consumers.forEach(function (c) { 
              c(store);
            });
          };
          var subscribe = function (consumer, noInit) {
            consumer = consumer.constructor === Array ? consumer : [consumer];
            consumers = consumers.concat(consumer);
            if (!noInit) {
              consumer.forEach(function (c) {
                c(store);
              });
            }
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

  var Fluxiny = {
    create: function () {
      var dispatcher = Dispatcher();

      return {
        createAction: function (type) {
          if (!type) {
            throw new Error('Please, provide action\'s type.');
          } else {
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

  if (typeof define === 'function' && define.amd) {
      define(function () {
        return Fluxiny;
      });
    } else if (typeof module !== 'undefined' && module.exports) {
      module.exports = Fluxiny;
    } else {
      root.Fluxiny = Fluxiny;
    }
})(typeof window !== 'undefined' ? window : this);
