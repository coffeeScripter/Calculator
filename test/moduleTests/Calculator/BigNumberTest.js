'use strict';

require('mocha');
var assert = require('assert');
var BigNumber = require('./../../../CalculationUtils/BigNumber');

describe('BigNumber', function() {
	it('should export a class', function() {
		assert(BigNumber);
		assert.equal(typeof BigNumber, 'function');
		assert.equal(typeof new BigNumber(2), 'object');
		// duck testing for class values
		assert.throws(() => {BigNumber(2)}, function(err){
			return err.name == 'TypeError'
			&& /Class constructor \w+ cannot be invoked without 'new'/g.test(err.message );
		});
	});

	it('should throw an error when invalid args are passed', function() {
		assert.throws(function() {
			BigNumber();
		});
		assert.throws(function() {
			BigNumber({});
		});
		assert.throws(function() {
			BigNumber('fdasfsf');
		});
	});
	describe('add', function(){
		it('should add numbers of equal length', function(){
			let bg1 = new BigNumber(256);
			let bg2 = new BigNumber(512);
			assert.equal(bg1.add(bg2.getValue()).getValue(),768);
			assert.equal(new BigNumber(256).add(new BigNumber(512).getValue()).getValue(),new BigNumber(512).add(new BigNumber(256).getValue()).getValue());
			bg1 = new BigNumber(256);
			assert.equal(bg1.add(512).getValue(),768);
		});
		it('should add numbers of different length', function(){
			let bg1 = new BigNumber(256);
			// let bg2 = new BigNumber(1512);
			// assert.equal(bg1.add(bg2.getValue()).getValue(),1768);
			// bg1 = new BigNumber(256);
			// bg2 = new BigNumber(1512);
			// let a = bg1.add(bg2.getValue()).getValue();
			// bg1 = new BigNumber(256);
			// bg2 = new BigNumber(1512);
			// let b = bg2.add(bg1.getValue()).getValue();
			// assert.equal(a,b);
			// bg1 = new BigNumber(256);
			assert.equal(bg1.add(1512).getValue(),1768);
		});
		it('should work with very large numbers',function(){
			let bg1 = new BigNumber(2**50);
			let bg2 = new BigNumber(2**51);
			bg1 = new BigNumber(2**50);
			bg2 = new BigNumber(2**51);
			let a = bg1.add(bg2.basis);
			bg1 = new BigNumber(2**50);
			bg2 = new BigNumber(2**51);
			let b = bg2.add(bg1.basis);
			assert.equal(a.getValue(),b.getValue());
		});
	});
	describe('multiply', function(){
		it('should multiply numbers of equal length', function(){
			let bg1 = new BigNumber(256);
			// let bg2 = new BigNumber(512);
			// assert.equal(bg1.multiply(bg2.basis).getValue(),256*512);
			// bg1 = new BigNumber(256);
			// bg2 = new BigNumber(512);
			// assert.equal(bg1.multiply(bg2.basis).getValue(),bg2.multiply(bg1.basis).getValue());
			// bg1 = new BigNumber(256);
			assert.equal(bg1.multiply(512).getValue(),256*512);
		});
		it('should multiply numbers of different length', function(){
			let bg1 = new BigNumber(256);
			// let bg2 = new BigNumber(1512);
			// assert.equal(bg1.multiply(bg2.getValue()).getValue(),256*1512);
			// bg1 = new BigNumber(256);
			// bg2 = new BigNumber(1512);
			// assert.equal(bg1.multiply(bg2.basis).getValue(),bg2.multiply(bg1.basis).getValue());
			// bg1 = new BigNumber(256);
			// bg2 = new BigNumber(1512);
			assert.equal(bg1.multiply(1512).getValue(),256*1512);
		});
		it.skip('should work with very large numbers',function(){
			let bg1 = new BigNumber(2**8);
			let bg2 = new BigNumber(2**51);
			assert.equal(bg1.multiply(bg2.basis).getValue(),bg2.multiply(bg1.basis).getValue());
		});
	});
	describe('power', function(){
		it('should power numbers of equal length', function(){
			let bg1 = new BigNumber(2);
			// let bg2 = new BigNumber(3);
			// assert.equal(bg1.power(bg2.basis).getValue(),2**3);
			// bg1 = new BigNumber(2);
			assert.equal(bg1.power(3).getValue(),2**3);
		});
		it('should power numbers of different length', function(){
			let bg1 = new BigNumber(2);
			// let bg2 = new BigNumber(10);
			// assert.equal(bg1.power(bg2.basis).getValue(),1024);
			// bg1 = new BigNumber(2);
			assert.equal(bg1.power(10).getValue(),1024);
		});
	});
	
});