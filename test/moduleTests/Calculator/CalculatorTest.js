'use strict';

require('mocha');
var assert = require('assert');
var expression = require('./../../../calculator');

describe('Expression', function() {
	it('should export a class', function() {
		assert(Expression);
		assert.equal(typeof Expression, 'function');
		assert.equal(typeof new Expression(), 'object');
		// duck testing for class values
		assert.throws(() => {Expression()}, function(err){
			return err.name == 'TypeError'
			&& /Class constructor \w+ cannot be invoked without 'new'/g.test(err.message );
		});
	});

	it.skip('should throw an error when invalid args are passed', function() {
		assert.throws(function() {
			new Expression();
		});
	});

	it('should accept arithmetic operations', function(){
		assert.equal(new Expression('2-3+6').solve().solve(), 5);
	});
	it('should accept multiplicative operations', function(){
		assert.equal(new Expression('2*3/6').solve().solve(), 1);
	});
	it.skip('should accept functional operations', function(){
		assert.equal(new Expression('2*CMB(3,6)').solve().solve(), 6**3);
	});
	it.skip('should accept variables', function(){
		assert.equal(new Expression('2*(3/6)').solve().solve(), 1);
	});
	it('should accept exponent operations', function(){
		assert.equal(new Expression('2^3').solve().solve(), 8);
	});
	it('should accept parentheticals', function(){
		assert.equal(new Expression('2*(3/6)').solve().solve(), 1);
		assert.throws(function(){new Expression('2*3/6)').solve().solve()});
		assert.throws(function(){new Expression('2*((3/6)').solve().solve()});
	});
	it('should accept modulo operations', function(){
		assert.equal(new Expression('6%3').solve().solve(), 0);
	});

});
