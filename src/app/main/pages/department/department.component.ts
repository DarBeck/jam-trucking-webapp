import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationService } from 'src/app/utilities/notification.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  employees: Employee[] = [];
  employeesLoading: boolean = true;
  departmentData!: Department | null;
  departmentId: number = 0;

  constructor(
    private departmentService: DepartmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.departmentId = +(this.route.snapshot.paramMap.get("id") ?? 0);
    this.departmentService.GetDepartment(this.departmentId).subscribe((data) => {
      this.departmentData = data;


    });
  }

}
