'use strict';

require('mocha');
var assert = require('assert');
var PayConverter = require('./../../../PayConverter');

describe('PayConverter', function() {
	it('should export a class', function() {
		assert(PayConverter);
		assert.equal(typeof PayConverter, 'function');
		assert.equal(typeof new PayConverter(), 'object');
		// duck testing for class values
		assert.throws(() => {PayConverter()}, function(err){
			return err.name == 'TypeError'
			&& /Class constructor \w+ cannot be invoked without 'new'/g.test(err.message );
		});
	});

	it('should throw an error when invalid args are passed', function() {
		assert.throws(function() {
			PayConverter();
		});
	});

	describe('getHourly', function(){
		const converter = new PayConverter();// uses default 
		it('Should be a function', function(){
			assert.equal(typeof converter.getHourly, 'function');
		});
		it('Should always return a value', function(){
			assert(converter.getHourly()==0);// returns default value
			assert(converter.setHourly(5).getHourly() == 5);// returns set value
		});
	});
	describe('getSalary', function(){
		const converter = new PayConverter();// uses default 
		it('Should be a function', function(){
			assert.equal(typeof converter.getSalary, 'function');
		});
		it('Should always return a value', function(){
			assert(converter.getSalary()==0);// returns default value
			assert(converter.setSalary(5).getSalary() == 5);// returns set value
		});
	});
	describe('getVacationDays', function(){
		const converter = new PayConverter();// uses default 
		it('Should be a function', function(){
			assert.equal(typeof converter.getVacationDays, 'function');
		});
		it('Should always return a value', function(){
			assert(converter.getVacationDays()==10); // test default
			assert(new PayConverter(5).getVacationDays() == 5);// returns set value
		});
	});
	describe('setHourly', function(){
		const converter = new PayConverter();
		it('Should be a function', function(){
			assert.equal(typeof converter.getVacationDays, 'function');
		});
		it('Should update hourly', function(){
			assert.equal(typeof converter.setSalary(50000), 'object');
			assert.equal(converter.getHourly(), 25.614754098360656 );
		});
		it('Should update salary', function(){
			assert.equal(typeof converter.setSalary(50000), 'object');
			assert.equal(converter.getSalary(), 50000 );
		});
		it('should throw an error when NaN args are passed', function() {
			// Number('') == 0 therefore '' is a valid argument
			assert.throws(function() {
				converter.setSalary('dsafda');
			});
			assert.throws(function() {
				converter.setSalary({});
			});
			assert.throws(function() {
				converter.setSalary(function(){});
			});
		});	
		
		
	});
	describe('setHourly', function(){
		const converter = new PayConverter();
		it('Should be a function', function(){
			assert.equal(typeof converter.getVacationDays, 'function');
		});
		it('Should update hourly', function(){
			assert.equal(typeof converter.setHourly(50), 'object');
			assert.equal(converter.getHourly(), 50 );
		});
		it('Should update salary', function(){
			assert.equal(typeof converter.setHourly(50), 'object');
			assert.equal(converter.getSalary(), 97600 );
		});
		it('should throw an error when NaN args are passed', function() {
			// Number('') == 0 therefore '' is a valid argument
			assert.throws(function() {
				converter.setHourly('dsafda');
			});
			assert.throws(function() {
				converter.setHourly({});
			});
			assert.throws(function() {
				converter.setHourly(function(){});
			});
		});
			
		

	});

});