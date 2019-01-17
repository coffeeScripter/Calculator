module.exports = PayConverter = class{
	constructor(vacationDays = 10, publicHolidays = 7, weekends = true){
		this.hourly = 0;
		this.salary = 0;
		this.vacationDays = vacationDays;
		this.weekends = weekends;
		this.publicHolidays = publicHolidays;
		this.workDays = 365 - this.vacationDays - this.publicHolidays - (weekends? 52 * 2:0);
	}
	recalcuateHourly(){
		this.hourly = this.salary/this.workDays/8;
	}
	recalculateSalary(){
		this.salary = this.hourly*this.workDays*8;		
	}
	getHourly(){
		return this.hourly;
	}
	setHourly(rate){
		if(isNaN(rate)){throw Error('NaN passed to PayConverter.setHourly');}
		this.hourly = Number(rate);
		this.recalculateSalary();
		return this;
	}
	getSalary(){
		return this.salary;
	}
	setSalary(rate){
		if(isNaN(rate)){throw Error('NaN passed to PayConverter.setSalary');}
		this.salary = Number(rate);
		this.recalcuateHourly();
		return this;
	}
	getVacationDays(){
		return this.vacationDays;
	}
}

