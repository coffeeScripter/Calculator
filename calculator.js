const FunctionRegex = /([A-Z]{3}|[A-Z]{4})([\(].+[\)])/;
const ParentheticalRegex = /[\(].+[\)]/;
const OperatorRegex = /[\-\+\*\\\^\%\/]/;
const DigitRegex = /\d+[\.]?[\d]+|\d/;


const FunctionToken = class{
	constructor(type, data){
		this.Func = type;
		this.values = data.split(',').map(a => new Expression(a));
		this.type = 'Function';
	}
	solve(){
		switch(this.Func){
			case 'CMB' : return new DigitToken(a**b);
			case 'PMB' : return new DigitToken(a/b);
			case '-' : return new DigitToken(a-b);
			case '+' : return new DigitToken(a+b);
			case '%' : return new DigitToken(a%b);
			case '^' : return new DigitToken(a**b);
			default : new Error('unknown operator');
		}
	}
	
}

const ParentheticalToken = class{
	constructor(data){
		this.subOperatorList = new Expression(data);
		this.type = 'Parenthetical';
	}
	solve(){
		return this.subOperatorList.solve();
		
	}
}
const OperatorToken = class{
	constructor(data){
		this.value = data;
		this.type = 'Operator';
	}
	solve(a,b){
		switch(this.value){
			case '*' : return new DigitToken(a*b);
			case '/' : return new DigitToken(a/b);
			case '-' : return new DigitToken(a-b);
			case '+' : return new DigitToken(a+b);
			case '%' : return new DigitToken(a%b);
			case '^' : return new DigitToken(a**b);
			default : new Error('unknown operator');
		}
	}
	
}
const DigitToken = class{
	constructor(data){
		this.value = new Number(data);
		this.type = 'Digit';
		
	}
	solve(){
		return this.value;
	}
	
}
const Expression = class{
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
		return FunctionRegex.exec(this.input)['index'];
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
	tokenize(){	
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
		return {'DataList':this.DataList,'Operator:List':this.OperatorList};
	}
	solve(){
		this.tokenize();
		this.DataList = this.DataList.map(a=> a.type == 'Parenthetical' ? a.solve(): a);
		//exponent Loop
		for(let i = 0; i< this.OperatorList.length; i++){
			if(this.OperatorList[i].value == '^'){
				this.DataList[i] = this.OperatorList[i].solve(this.DataList[i].solve(),this.DataList[i+1].solve());
				this.OperatorList.splice(i,1);
				this.DataList.splice(i+1,1);
				i--;
			}
		}
		//operator Loop
		for(let i = 0; i< this.OperatorList.length; i++){
			if(this.OperatorList[i].value == '*' || this.OperatorList[i].value == '/' || this.OperatorList[i].value == '%'){
				this.DataList[i] = this.OperatorList[i].solve(this.DataList[i].solve(),this.DataList[i+1].solve());
				this.OperatorList.splice(i,1);
				this.DataList.splice(i+1,1);
				i--;
			}
		}
		for(let i = 0; i< this.OperatorList.length; i++){
			if(this.OperatorList[i].value == '+'|| this.OperatorList[i].value == '-'){
				this.DataList[i] = this.OperatorList[i].solve(this.DataList[i].solve(),this.DataList[i+1].solve());
				this.OperatorList.splice(i,1);
				this.DataList.splice(i+1,1);
				i--;
			}
		}
		return this.DataList[0];
	}
}

