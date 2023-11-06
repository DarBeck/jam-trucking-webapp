import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddDepartmentDto } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationService } from 'src/app/utilities/notification.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddDepartmentComponent implements OnInit {
  addDepartmentForm: UntypedFormGroup;
  loading: boolean = false;
  employees: Employee[] = [];
  employeesLoading: boolean = true;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private notifyService: NotificationService,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService
  ) {
    this.addDepartmentForm = this.formBuilder.group({
      supervisorId: [null, Validators.required],
      name: ['', Validators.required],
      mainPhoneNumber: [''],
    });
  }

  ngOnInit(): void {
    this.employeeService.GetEmployees().subscribe((data) => {
      this.employees = data
        .filter((i) => i.role == 'Supervisor')
        .map((i) => {
          i.fullName = i.firstName + ' ' + i.lastName;
          return i;
        });;
      this.employeesLoading = false;
    });
  }

  get f() {
    return this.addDepartmentForm.controls;
  }

  onSubmit(): void {
    this.loading = true;

    var dto: AddDepartmentDto = {
      supervisorId: this.f['supervisorId'].value,
      name: this.f['name'].value,
      mainPhoneNumber: this.f['mainPhoneNumber'].value,
    };

    this.departmentService.AddDepartment(dto).subscribe(
      (response) => {
        if (response.status == 200) {
          console.log("Successfully added department");
          this.notifyService.showSuccess(
            `${dto.name} Department was entered successfully`,
            'Success!'
          );

          this.addDepartmentForm.reset();
        }

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
