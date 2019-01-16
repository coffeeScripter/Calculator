module.exports = OperatorToken = class{
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