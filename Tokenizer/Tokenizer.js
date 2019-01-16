require('./FunctionToken');
require('./ParentheticalToken');
require('./OperatorToken');
require('./DigitToken');
require('./FunctionToken');
// require('./Regex');
const FunctionRegex = /([A-Z]{3}|[A-Z]{4})([\(].+[\)])/;
const ParentheticalRegex = /[\(].+[\)]/;
const OperatorRegex = /[\-\+\*\\\^\%\/]/;
const DigitRegex = /\d+[\.]?[\d]+|\d/;

module.exports = Tokenizer = class{
	constructor(input){
		this.input = input;
		this.OperatorList = [];
		this.DataList = [];
	}
	isEmpty(){
		return this.input == '';
	}
	isParenthetical(){
		return this.input.charAt(0) == '(';
	}
	isFunction(){
		if(FunctionRegex.test(this.input)) {
			return FunctionRegex.exec(this.input)['index'];
		}
		return false;
	}
	isVariable(){
		return false;
	}
	isOperator(){
		return OperatorRegex.test(this.input.charAt(0));
	}
	isDigit(){
		return DigitRegex.test(this.input.charAt(0));
	}
	popParenthetical(){
		let match = ParentheticalRegex.exec(this.input);
		this.input = this.input.substring(match[0].length);
		return new ParentheticalToken(match[0].substring(1, match[0].length-1));
	}
	popFunction(){
		let match = ParentheticalRegex.exec(this.input);
		this.input = this.input.substring(match[0].length);
		return new FunctionToken(match[1],match[2].substring(1, match[2].length-1));	
	}
	popVariable(){}
	popOperator(){
		let match = OperatorRegex.exec(this.input);
		this.input = this.input.substring(match[0].length);
		return new OperatorToken(match[0]);
	}
	popDigit(){
		let match = DigitRegex.exec(this.input)
		this.input = this.input.substring(match[0].length);
		return new DigitToken(match[0]);
	}
	tokenize(input){
		if(typeof input == 'string'){
			this.input = input;
		}
		while(!this.isEmpty()){
			if(this.isFunction()){
				this.DataList.push( this.popFunction());
			}
			if(this.isParenthetical()){
				this.DataList.push( this.popParenthetical());
			}
			if(this.isVariable()){
				this.OperatorList.push( this.popVariable());
			}
			if(this.isOperator()){
				this.OperatorList.push( this.popOperator());
			}
			if(this.isDigit()){
				this.DataList.push( this.popDigit());
			}
		}
		return this;
	}
}