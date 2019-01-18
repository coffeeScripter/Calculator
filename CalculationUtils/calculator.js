require('./Tokenizer/Tokenizer');
exports.module = Expression = class{
// const Expression = class{
	constructor(input){
		this.input = input;
		this.tok = new Tokenizer(input);
	}
	
	solve(){
		this.tok.tokenize();
		let OperatorList = this.tok.OperatorList;
		let DataList = this.tok.DataList;
		
		DataList = DataList.map(a=> a.type == 'Parenthetical' ? a.solve(): a);
		//exponent Loop
		for(let i = 0; i< OperatorList.length; i++){
			if(OperatorList[i].value == '^'){
				DataList[i] = OperatorList[i].solve(DataList[i].solve(),DataList[i+1].solve());
				OperatorList.splice(i,1);
				DataList.splice(i+1,1);
				i--;
			}
		}
		//operator Loop
		for(let i = 0; i< OperatorList.length; i++){
			if(OperatorList[i].value == '*' || OperatorList[i].value == '/' || OperatorList[i].value == '%'){
				DataList[i] = OperatorList[i].solve(DataList[i].solve(),DataList[i+1].solve());
				OperatorList.splice(i,1);
				DataList.splice(i+1,1);
				i--;
			}
		}
		for(let i = 0; i< OperatorList.length; i++){
			if(OperatorList[i].value == '+'|| OperatorList[i].value == '-'){
				DataList[i] = OperatorList[i].solve(DataList[i].solve(),DataList[i+1].solve());
				OperatorList.splice(i,1);
				DataList.splice(i+1,1);
				i--;
			}
		}
		return DataList[0];
	}
}