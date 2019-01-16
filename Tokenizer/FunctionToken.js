module.exports =  FunctionToken = class{
	constructor(type, data){
		this.Func = type;
		this.values = data.split(',').map(a => new Expression(a));
		this.type = 'Function';
	}
	solve(){
		switch(this.Func){
			// case 'CMB' : return new DigitToken(a**b);
			// case 'PMB' : return new DigitToken(a/b);
			// case '-' : return new DigitToken(a-b);
			// case '+' : return new DigitToken(a+b);
			// case '%' : return new DigitToken(a%b);
			// case '^' : return new DigitToken(a**b);
			default : new Error('unknown operator');
		}
	}
	
}
