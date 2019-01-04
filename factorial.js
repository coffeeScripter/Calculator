
function factorial(n){
	if(n == 0){
		return 1;
	}
	return n * factorial(n-1);
}
function printer(n){
	while(n){
		let line = '';
		let j = n;
		while(j > 1){
			line += j + ' x ';
			j--;
		}
		line += 1;
		line = factorial(n)+ ': ' + line;
		console.log(line);
		n--;
	}

}
printer(50);



const BigNumber =class{
	constructor(number){
		this.basis = (number +'').split('').map(a => new Number(a)).reverse();
	}
	getValue(){
		let temp = this.basis;
		return temp.reverse();
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

	}
	multiply(value){
		let val = (value +'').split('').map(a => new Number(a)).reverse();
		let d1 = [];
		let d2 = [];
		for(let i = 0; i< val.length; i++){
			d2 = [];
			for(let j = 0; j< this.basis.length; j++){
				d2[j+1] = new Number((this.basis[j+1]?this.basis[j+1]:0) + Math.floor((this.basis[j] * val[i]) / 10));
				d2[j] = new Number((this.basis[j] * val[i]) % 10);
			}
			for(let j = 1; j< i; j++){
				console.log('added 0');
				d2.push(new Number(0));
			}
			d1.push(d2);
		}
		console.log(d1);
		this.basis = d1[0].reverse();
			console.log('\t this.basis');
			console.log(this.basis);
		for(let u = 1; u < d1.length; u++){
			this.add(d1[u]);
		}
		this.basis.reverse();
	}
	
}
// let b = new BigNumber(factorial(20))
// console.log(b.basis.join(''));

// b.add(factorial(20));
let b = new BigNumber(120);
console.log(b.getValue().join(''));

b.multiply(25);
console.log(b.getValue().join(''));
// b.add();
// console.log(b.getValue().join(''));

console.log(factorial(500)/factorial(499));


