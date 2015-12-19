var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var Fluxiny = require('../src');

chai.expect();
chai.use(sinonChai);

var expect = chai.expect;
var createSubscriber, createAction;

describe('Given an instance of Fluxiny', function() {

  describe('when the module is required', function () {
    it('should have .create method avaialble', function () {
      expect('create' in Fluxiny).to.be.true;
    });
    it('should return createSubscriber and createAction if we call .create', function () {
      var Flux = Fluxiny.create();

      expect('createSubscriber' in Flux).to.be.true;
      expect('createAction' in Flux).to.be.true;
    });
  });

  describe('when we have createSubscriber and createAction avaialble', function () {

    beforeEach(function () {
      var Flux = Fluxiny.create();

      createSubscriber = Flux.createSubscriber;
      createAction = Flux.createAction;
    });

    describe('and when we provide a store without `update` method', function () {
      it('should thrown an error', function (done) {
        try {
          createSubscriber({});
        } catch(err) {
          done();
        }
      });
    });

    describe('and when we call `createAction` without providing action type', function () {
      it('should thrown an error', function (done) {
        try {
          createAction();
        } catch(err) {
          done();
        }
      });
    });

    describe('and when we register the store and send an action', function () {
      it('should call the update method of the store', function () {
        var storeUpdate = sinon.spy();
        var store = { update: storeUpdate };
        createSubscriber(store);
        createAction('test-action')();
        expect(storeUpdate).to.be.calledOnce;
      });
      it('should call the update method twice if we fire two actions', function () {
        var storeUpdate = sinon.spy();
        var store = { update: storeUpdate };
        createSubscriber(store);
        createAction('test-action-1')();
        createAction('test-action-2')();
        expect(storeUpdate).to.be.calledTwice;
      });
      it('should call the update method and receive the payload', function () {
        var storeUpdate = sinon.spy();
        var store = { update: storeUpdate };
        createSubscriber(store);
        createAction('test-action')({ answer: 42 });
        expect(storeUpdate).to.be.calledWith(
          { type: 'test-action', payload: { answer: 42 }},
          sinon.match.func
        );
      });
      it('should get the view updated', function () {
        var store = {
          update: function (action, change) {
            if (action.type === 'test-action') change();
          }
        };
        var consumer = sinon.spy();

        createSubscriber(store)(consumer);
        createAction('test-action')();
        expect(consumer).to.be.calledTwice;
      });
      it('should be able to prevent the default consumer call', function () {
        var store = {
          update: function (action, change) {
            if (action.type === 'test-action') change();
          }
        };
        var consumer = sinon.spy();
        
        createSubscriber(store)(consumer, true);
        createAction('test-action')();
        expect(consumer).to.be.calledOnce;
      });
      it('should get the view updated using data from the store', function (done) {
        var store = {
          _data: { answer: 0 },
          update: function (action, change) {
            if (action.type === 'test-action') {
              this._data.answer = action.payload.answer;
              change();
            }
          },
          getAnswer: function () {
            return this._data.answer;
          }
        };
        var consumer = function (store) {
          expect(store.getAnswer()).to.be.equal(42);
          done();
        };

        createSubscriber(store)(consumer, true);
        createAction('test-action')({ answer: 42 });
      });
      it('should be able to accept multiple consumers', function () {
        var store = {
          update: function (action, change) {
            if (action.type === 'test-action') change();
          }
        };
        var consumerA = sinon.spy();
        var consumerB = sinon.spy();

        createSubscriber(store)([ consumerA, consumerB ], true);
        createAction('test-action')();
        expect(consumerA).to.be.calledOnce;
        expect(consumerB).to.be.calledOnce;
      });
    });

    describe('and when we have multiple stores and send an action', function () {
      it('should send the action to every stores', function () {
        var storeUpdateA = sinon.spy();
        var storeUpdateB = sinon.spy();

        createSubscriber({ update: storeUpdateA });
        createSubscriber({ update: storeUpdateB });
        createAction('test-action')();

        expect(storeUpdateA).to.be.calledOnce;
        expect(storeUpdateB).to.be.calledOnce;
      });
    });

  });

});