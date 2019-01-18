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

const writeFile = function(fileName,data){
	let ws = fs.createWriteStream(fileName,'utf8');
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
	let buffer = '';
	
	if(typeof processLine != 'function'){
		processLine = function(line){
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
			return columns;
		}
	}
	rs.on('data', function(chunk) {
		let lines = (buffer + chunk).split(/\r?\n/g);
		buffer = lines.pop();
		for (let i = 0; i < lines.length; ++i) {
			columns = processLine(lines[i].split(','),columns);
		}
	});
	rs.on('end', function() {
		if(buffer.length > 0){
			console.log('ended on non-empty buffer: ' + buffer);
			columns = processLine(buffer.split(','),columns);
			callback(columns);
		}
	});
	rs.on('error', function(err){
		console.log(err);
	});
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