var fs = require('fs');
const metaData = require('./../MetaData.js');
const HeaderReader = class{
	constructor(fileName){
		this.fileName = fileName;
	}
	readHeaderLine(){
		let columnList = [];
		let header = fs.createReadStream(this.fileName,'utf8');
		header.on('data', function(chunk) {
			let firstLine = chunk.split(/\r?\n/g)[0].split(',');
			for (let i in firstLine){
				columnList.push(new metaData.ColumnMetaData(firstLine[i],i)); 
			}	
			header.close();
		});
		header.on('close', function() {
			// console.log(columnList);
		});
		header.on('error', function(err){
			console.log(err);
		});
		return columnList;
	}
}

module.exports = HeaderReader;