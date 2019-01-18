require('./BigNumber');
module.exports = Factorial = class{
	calculate(n, forceBig){
		if(forceBig || n>21){
			let a = new BigNumber(1);
			for(let b = 1; b<=n;b++){	
				a.multiply(b);
			}
			return a.getValue();
			
		}else{
			if(n <= 0){
				return 1;
			}
			// when recursion is stupid
			let a = 1;
			for(let b = 1; b<n;b++,a*=b){	}
			return a;
		}
	}
	printer(n){
		let printString = '';
		while(n){
			let line = '';
			let j = n;
			while(j > 1){
				line += j + ' x ';
				j--;
			}
			line += 1; // final 1 for printout
			line = this.calculate(n) + ': ' + line;
			printString += line +'\n';
			n--;
		}
		return printString;
	}
}

