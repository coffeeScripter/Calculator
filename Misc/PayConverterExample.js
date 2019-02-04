	require('./PayConverter')
	let myoffers = [
		{'hourly':25},
		{'salary':50000},
		{'salary':55000},
		{'salary':45000},
		{'hourly':22}];
	let d = myoffers.reduce(function(acc, inc){
		let c = new PayConverter();
		if(inc.hourly){
			c.setHourly(inc.hourly);
		}
		else if(inc.salary){
			c.setSalary(inc.salary);
		}
		return acc = c.getHourly() > acc.getHourly() ? c: acc;
		
	}, new PayConverter());
	console.log(d);