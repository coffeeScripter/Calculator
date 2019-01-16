'use strict';

require('mocha');
var assert = require('assert');
var calculator = require('./../../../Tokenizer/DigitToken');
var calculator = require('./../../../Tokenizer/FunctionToken');
var calculator = require('./../../../Tokenizer/OperatorToken');
var calculator = require('./../../../Tokenizer/ParentheticalToken');
var calculator = require('./../../../Tokenizer/Tokenizer');

describe('Tokens', function(){
	describe('FunctionToken', function(){
		it('should export a class', function() {
			assert(FunctionToken);
			assert.equal(typeof FunctionToken, 'function');
			assert.equal(typeof new FunctionToken('CMB','3,6'), 'object');
			// duck testing for class values
			assert.throws(() => {FunctionToken('CMB','3,6')}, function(err){
				return err.name == 'TypeError'
				&& /Class constructor \w+ cannot be invoked without 'new'/g.test(err.message );
			});
		});
		it('Solve should Resolve!', function(){
			assert(typeof OperatorToken.solve, 'function')
		})
	});
	describe('ParentheticalToken', function(){
		it('should export a class', function() {
			assert(ParentheticalToken);
			assert.equal(typeof ParentheticalToken, 'function');
			assert.equal(typeof new ParentheticalToken('2+2'), 'object');
			// duck testing for class values
			assert.throws(() => {ParentheticalToken('2+2')}, function(err){
				return err.name == 'TypeError'
				&& /Class constructor \w+ cannot be invoked without 'new'/g.test(err.message );
			});
		});
		it('Solve should Resolve!', function(){
			assert(typeof OperatorToken.solve, 'function')
		})
	});
	describe('OperatorToken', function(){
		it('should export a class', function() {
			assert(OperatorToken);
			assert.equal(typeof OperatorToken, 'function');
			assert.equal(typeof new OperatorToken('+'), 'object');
			// duck testing for class values
			assert.throws(() => {OperatorToken('+')}, function(err){
				return err.name == 'TypeError'
				&& /Class constructor \w+ cannot be invoked without 'new'/g.test(err.message );
			});
		});
		it('Solve should Resolve!', function(){
			assert(typeof OperatorToken.solve, 'function')
		})
	});
	describe('DigitToken', function(){
		it('should export a class', function() {
			assert(DigitToken);
			assert.equal(typeof DigitToken, 'function');
			assert.equal(typeof new DigitToken('5'), 'object');
			// duck testing for class values
			assert.throws(() => {DigitToken('5')}, function(err){
				return err.name == 'TypeError'
				&& /Class constructor \w+ cannot be invoked without 'new'/g.test(err.message );
			});
		});
		it('Solve should Resolve!', function(){
			assert(typeof OperatorToken.solve, 'function')
		})
	});
	describe('Tokenizer', function(){
		it('should export a class', function() {
			assert(Tokenizer);
			assert.equal(typeof Tokenizer, 'function');
			assert.equal(typeof new Tokenizer(), 'object');
			// duck testing for class values
			assert.throws(() => {Tokenizer()}, function(err){
				return err.name == 'TypeError'
				&& /Class constructor \w+ cannot be invoked without 'new'/g.test(err.message );
			});
		});
		it('Tokenized expression has proper number of operator and data tokens', function(){
			let t = new Tokenizer('2+2*2/2-8^(1/3)').tokenize();
			assert.equal(t.OperatorList.length, 5);
			assert.equal(t.DataList.length, 6);
		});
		it('should properly tokenize expressions', function(){
			let t = new Tokenizer('2+2*2/2-8^(1/3)').tokenize();
			assert.equal(t.OperatorList.length, 5);
			assert.equal(t.DataList.length, 6);
		});
		it('should throw an error when invalid args are passed', function() {
			assert.throws(function() {
				calculator();
			});
			assert.throws(function() {
				calculator({});
			});
		});
	});
});