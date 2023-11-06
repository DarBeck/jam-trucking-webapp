import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  selectOption: number = 10;
  employees: Employee[] = [];
  employeesFilter: Employee[] = [];
  ColumnMode = ColumnMode;
  employeesLoading: boolean = true;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.GetEmployees().subscribe((data) => {
      this.employees = data;
      this.employeesFilter = data;
      this.employeesLoading = false;
    });
  }
}
