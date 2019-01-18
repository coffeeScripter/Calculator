module.exports =  BigNumber = class{
	constructor(number){
		this.basis = number.toString().split('').map(a => new Number(a)).reverse();
	}
	getValue(){
		return this.basis.slice().reverse().join('');
	}
	add(value){
		let val;
		if(Array.isArray(value)){
			val = value;
		}
		else{
			val = (value +'').split('').map(a => new Number(a)).reverse();
		}
		for(let i = 0; i< val.length; i++){
			this.basis[i+1] = new Number((this.basis[i+1]?this.basis[i+1]:0) + Math.floor((this.basis[i] + val[i]) / 10));
			this.basis[i] = new Number((this.basis[i] + val[i]) % 10);
		}
		if(this.basis[this.basis.length-1]== 0) {this.basis.pop();}
		return this;
	}
	multiply(value){
		let temp = this.basis.slice();
		for(let i = 1; i<value; i++ ){
			this.add(temp);
		}
		return this;
	}
	power(value){
		let temp = this.basis.slice();
		for(let i = 1; i<value; i++ ){
			this.multiply(temp);
		}
		return this;
	}
	
}

