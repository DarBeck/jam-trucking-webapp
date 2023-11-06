import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {
  selectOption: number = 10;
  departments: Department[] = [];
  departmentsFilter: Department[] = [];
  ColumnMode = ColumnMode;
  departmentsLoading: boolean = true;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.departmentService.GetDepartments().subscribe((data) => {
      this.departments = data;
      this.departmentsFilter = data;
      this.departmentsLoading = false;
    });
  }
}
