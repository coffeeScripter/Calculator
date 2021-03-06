const di = require('./DataReading/DataImporter.js');
const args = process.argv.slice(2);

let processor = function(line, columns){
	for (let i = 0; i < line.length; i++) {
		// TODO: add Categorical check
		if(/[-]?\d+[\.]?[\d]+|\d/.test(line[i])){
			columns[i].NumberCount++;
			columns[i].sum += Number(line[i]);
			
			let presum = columns[i].average * ((columns[i].NumberCount -1)/columns[i].NumberCount) ;
			columns[i].average = presum + (Number(line[i])/columns[i].NumberCount);
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

new DataImporter().processFile(args[0],processor,  console.log);

