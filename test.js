'use strict';

require('mocha');
var assert = require('assert');
var calculator = require('./');
var Base = require('base');
var app;

describe('calculator', function() {
  beforeEach(function() {
    app = new Base();
    app.use(calculator());
  });

  describe('plugin', function() {
    it('should export a function', function() {
      assert.equal(typeof calculator, 'function');
    });

    it('should export an object', function() {
      assert(calculator);
      assert.equal(typeof calculator, 'object');
    });

    it('should expose a .calculator method', function() {
      assert.equal(typeof app.calculator, 'function');
    });

    it('should throw an error when invalid args are passed', function() {
      assert.throws(function() {
        calculator();
      });
    });

  });

  describe('.calculator', function() {
    it('should create an calculator pattern', function() {
      assert.equal(app.calculator('foo'), 'foo');
    });
  });

});