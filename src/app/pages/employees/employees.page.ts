import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {

  employees = [1,2,3,4,5,6,7,8,9,10];

  constructor() { }

  ngOnInit() {
  }

}
