'use strict';

require('mocha');
var assert = require('assert');
var Factorial = require('./../../../CalculationUtils/factorial');

describe('Factorial', function() {
	it('should export a class', function() {
		assert(Factorial);
		assert.equal(typeof Factorial, 'function');
		assert.equal(typeof new Factorial(), 'object');
		// duck testing for class values
		assert.throws(() => {Factorial()}, function(err){
			return err.name == 'TypeError'
			&& /Class constructor \w+ cannot be invoked without 'new'/g.test(err.message );
		});
	});

	it.skip('should throw an error when invalid args are passed', function() {
		assert.throws(function() {
			BigNumber();
		});
	});
	describe('calculate', function(){
		it('should solve factorials smaller than 22 as numbers', function(){
			const fact = new Factorial();
			assert.equal(fact.calculate(18),6402373705728000);
			assert.equal(fact.calculate(21), 51090942171709440000);
		});
		it('should solve work using BigNumbers if forced', function(){
			const fact = new Factorial();
			assert.equal(fact.calculate(18,true),6402373705728000);
			assert.equal(fact.calculate(21,true), 51090942171709440000);
		});
		it('should work with very large numbers',function(){
			const fact = new Factorial();
			assert.equal(fact.calculate(28),304888344611713860501504000000);
		});
		it.skip('should log if a BigNumber is used',function(){
			expect( console.log.calledOnce ).to.be.true;
			expect( console.log.calledWith('Good morning') ).to.be.true;
		});
		
	});
	
});