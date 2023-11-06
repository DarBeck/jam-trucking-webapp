import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employeeData: Employee | null = null;
  employeeId: number = 0;
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employeeId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.employeeService.GetEmployee(this.employeeId).subscribe((data) => {
      this.employeeData = data;
    });
  }
}
