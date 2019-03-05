const fs = require('fs');
class JSONImporter{
  constructor(readStream, columnData){
    this.readStream;
    this.columnData;
  }

  readFile(processLine, callback = console.log){
  	let buffer = '';

  	if(typeof processLine != 'function'){
  		throw new Error("No processing requested!");
  	}
  	this.readStream.on('data', function(chunk) {
  		let lines = (buffer + chunk).split(/\r?\n/g);
  		buffer = lines.pop();
  		for (let i = 0; i < lines.length; ++i) {
  			columns = processLine(lines[i].split(','),columns);
  		}
  	});
  	this.readStream.on('end', function() {
  		if(buffer.length > 0){
  			console.log('ended on non-empty buffer: ' + buffer);
  			columns = processLine(buffer.split(','),columns);
  			callback(columns);
  		}
  	});
  	this.readStream.on('error', function(err){
  		console.log(err);
  	});
  }
}
