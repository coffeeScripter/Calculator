// MetaData Classes
 
const ColumnMetaData = class{
	constructor(name, num){
		this.ColumnName = 'columnName' + num;
		this.NumberCount = 0;
		this.NominalCount = 0;
		this.FalsyCount = 0;
		this.count = 0;
		this.sum = 0;
	}
}
const QualitativeColumnMetaData = class{
	constructor(name){
		// super(name)
	}
}
Object.setPrototypeOf(QualitativeColumnMetaData.prototype, ColumnMetaData);
const QuantitativeColumnMetaData = class{
	constructor(name){
		this.sum = 0;
		// super(name)
	}
}
Object.setPrototypeOf(QuantitativeColumnMetaData.prototype, ColumnMetaData);

// TODO: add Factory 

module.exports = {'ColumnMetaData': ColumnMetaData,
'QualitativeColumnMetaData': QualitativeColumnMetaData,
'QuantitativeColumnMetaData' :QuantitativeColumnMetaData}