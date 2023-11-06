import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { genders, parishes, roles, skillLevels } from 'src/app/data/global-data';
import { UserDetails } from 'src/app/models/customer';
import { Department } from 'src/app/models/department';
import { AddEmployeeDto } from 'src/app/models/employee';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationService } from 'src/app/utilities/notification.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: UntypedFormGroup;
  loading: boolean = false;
  states = parishes;
  genders = genders;
  departments: Department[] = [];
  departmentsLoading: boolean = true;
  roles = roles;
  skillLevels = skillLevels;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private notifyService: NotificationService,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {
    this.addEmployeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [null],
      dob: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: [null, Validators.required],
      zip: [''],
      password: ['', Validators.required],
      role: [null, Validators.required],
      extension: [''],
      departmentId: [null],
      skillLevel: [null],
    });
  }
  ngOnInit(): void {
    this.departmentService.GetDepartments().subscribe((data) => {
      this.departments = data;
      this.departmentsLoading = false;
    });
  }

  get f() {
    return this.addEmployeeForm.controls;
  }

  onSubmit(): void {
    this.loading = true;

    let userDeatils: UserDetails = {
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      gender: this.f['gender'].value,
      dob: this.f['dob'].value,
      street: this.f['street'].value,
      city: this.f['city'].value,
      state: this.f['state'].value,
      zip: this.f['zip'].value,
    };

    var dto: AddEmployeeDto = {
      email: this.f['email'].value,
      role: this.f['role'].value,
      extension: this.f['extension'].value,
      departmentId: this.f['departmentId'].value,
      skillLevel: this.f['skillLevel'].value,
      password: this.f['password'].value,
      userDetails: userDeatils,
    };

    this.employeeService.AddEmployee(dto).subscribe(
      (response) => {
        if (response.status == 200) {
          this.notifyService.showSuccess(
            `${dto.userDetails.firstName} ${dto.userDetails.lastName} was entered successfully`,
            'Success!');

          this.addEmployeeForm.reset();
        }

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  generatePassword(): void {
    console.log("Generating password");
    const length = 12;
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }

    console.log("Password: " + password);

    this.f['password'].setValue(password);
  }
}
