require('../calculator');
module.exports = ParentheticalToken = class{
	constructor(data){
		this.subOperatorList = new Expression(data);
		this.type = 'Parenthetical';
	}
	solve(){
		return this.subOperatorList.solve();
		
	}
}