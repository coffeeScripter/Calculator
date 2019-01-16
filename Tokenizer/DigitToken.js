module.exports = DigitToken = class{
	constructor(data){
		this.value = new Number(data);
		this.type = 'Digit';
		
	}
	solve(){
		return this.value;
	}
	
}