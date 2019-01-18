const fs = require('fs');
function Read(fileName, linesToRead = Infinity){
let rs = fs.createReadStream(fileName,'utf8');
	let buffer = '';
	let count = 0;
	rs.on('data', function(chunk) {
		let lines = (buffer + chunk).split(/\r?\n|\{/g);
		buffer = lines.pop();
		for (let i = 0; i < lines.length; ++i) {
			console.log('{'+ lines[i]);
			count++
			if(count == linesToRead){rs.close(); break;}
		}
	});
	rs.on('end', function() {
		if(buffer.length > 0){
			console.log('ended on non-empty buffer: ' + buffer);
		}
	});
	rs.on('error', function(err){
		console.log(err);
	});
	
}
Read(process.argv[2],process.argv[3])