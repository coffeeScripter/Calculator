// MetaData Classes
 
module.exports = ColumnMetaData = class{
	constructor(name, num){
		this.ColumnName = 'columnName' + num;
		this.NumberCount = 0;
		this.NominalCount = 0;
		this.FalsyCount = 0;
		this.count = 0;
	}
}
module.exports = QualitativeColumnMetaData = class{
	constructor(name){
		// super(name)
	}
}
Object.setPrototypeOf(QualitativeColumnMetaData.prototype, ColumnMetaData);
module.exports = QuantitativeColumnMetaData = class{
	constructor(name){
		// super(name)
	}
}
Object.setPrototypeOf(QuantitativeColumnMetaData.prototype, ColumnMetaData);
