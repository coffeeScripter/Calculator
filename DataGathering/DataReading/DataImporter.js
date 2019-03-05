const fs = require('fs');
const HeaderReader = require('./CSVImporter/ReadHeader.js');
const CsvImporter = require('./CSVImporter/Importer.js');
const JSONImporter = require('./JSONImporter/Importer.js');

const writeFile = function(fileName,data){
	//let ws = fs.createWriteStream(fileName,'utf8');
	fs.writeFile(fileName,JSON.stringify(data), (err) => {
		if(err){
			throw err;
		}
		console.log(data);
	});
}

const readFile = function(fileName, headerData, processLine,callback = console.log){
	let rs = fs.createReadStream(fileName,'utf8');
	let columns = headerData;
	if(!Array.isArray(columns)){
		columns = new HeaderReader(fileName).readHeaderLine();
	}
	if(typeof processLine != 'function'){
		throw new Error("No processing requested!");
	}
	let fileHandler;
	// file reader selection
	switch(fileName.substring(fileName.lastIndexOf('.')+1)){
		case 'json':
		case 'js':
		case 'jsx': fileHandler = new JSONImporter(rs, columns, processLine, callback);
			break;
		case 'csv' : fileHandler = new CSVImporter(rs, columns, processLine, callback);
			break;
	}

}
module.exports = DataImporter = class{
	constructor(){}
	readFile(fileName, start, end){
		//TODO
		throw new Error('Not Implemented');
	}
	readHeader(fileName){
		//TODO
		throw new Error('Not Implemented');
	}
	scanFile(fileName){
		return readFile(fileName, new HeaderReader(fileName).readHeaderLine());
	}
	processFile(fileName,process, callback){
		readFile(fileName,
			new HeaderReader(fileName).readHeaderLine(),
			process,
			callback
			);
	}
}
