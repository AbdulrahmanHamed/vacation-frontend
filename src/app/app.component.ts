import { Component } from '@angular/core';
import { Balance } from './model/balance';
import { VacationsService } from './service/vacations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vacation';
  vacationTypes: any;
  employeeId: any;
  balance: Balance = {};
  constructor(private vacationsService: VacationsService) {

  }
  ngOnInit() {
    console.log("onInit")
    this.vacationsService.getVacationTypes().subscribe(res => {
      console.log(res);
      this.vacationTypes = res.types;
    })
  }

  getBalances(empId: String) {
    this.vacationsService.getEmployeeVacationsBalance(+empId).subscribe(res => {
      this.balance = res;
    })
  }
  reserve(vacationType:any,start: any, end: any) {
    this.vacationsService.createEmployeeVacation(this.employeeId,vacationType,end,start).subscribe(res=>{
      this.getBalances(this.employeeId);
    })
  }
}
