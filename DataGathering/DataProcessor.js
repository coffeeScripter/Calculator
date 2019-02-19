const di = require('./DataReading/DataImporter.js');
const args = process.argv.slice(2);

let processor = function(line, columns){
	for (let i = 0; i < line.length; i++) {
		// TODO: add Categorical check
		if(/[-]?\d+[\.]?[\d]+|\d/.test(line[i])){
			columns[i].NumberCount++;
			columns[i].sum += Number(line[i]);
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

const d = new DataImporter();
console.log(d.processFile(args[0],processor,function(columns){
	console.log(columns[0].sum);
	let supersum = 0;
	let b = 50;
	for(let i = columns.length-1; i > 0;i--){
		supersum += columns[i].sum *(10**(b-i));
		if(supersum.length > 10){
			supersum == supersum.slice(0, 10);
			b--;
		}
	}
	console.log(supersum);
}));

