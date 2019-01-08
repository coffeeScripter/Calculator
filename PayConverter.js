const PayConverter = class{
	constructor(publicHolidays = 7, vacationDays = 10, weekends = true){
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
		this.hourly = rate;
		this.recalculateSalary();
	}
	getSalary(){
		return this.salary;
	}
	setSalary(rate){
		this.salary = rate;
		this.recalcuateHourly();
	}
	getVacationDays(days){
		this.vacationDays = days;
	}
}