var fs = require('fs');
const metaData = require('./MetaData');
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
				columnList.push(new ColumnMetaData(firstLine[i],i)); 
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


const readFile = function(fileName, headerData){
	let rs = fs.createReadStream(fileName,'utf8');
	let columns = headerData;
	let buffer = '';
	let processLine = function(line){
		for (let i = 0; i < line.length; i++) {
			// TODO: add Categorical check
			if(/[-]?\d+[\.]?[\d]+|\d/.test(line[i])){
				columns[i].NumberCount++;
			}
			else if(!/\S/g.test(line[i])){
				columns[i].FalsyCount++;
			}
			else{
				columns[i].NominalCount++;
			}
			columns[i].count++;

		}
		
	}
	rs.on('data', function(chunk) {
		let lines = (buffer + chunk).split(/\r?\n/g);
		buffer = lines.pop();
		for (let i = 0; i < lines.length; ++i) {
			processLine(lines[i].split(','));
		}
	});
	rs.on('end', function() {
		if(buffer.length > 0){
			console.log('ended on non-empty buffer: ' + buffer);
			processLine(buffer.split(','));
		}
		console.log(columns);
	});
	rs.on('error', function(err){
		console.log(err);
	});
}
