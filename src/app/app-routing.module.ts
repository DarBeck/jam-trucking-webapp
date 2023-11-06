import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './main/pages/dashboard/dashboard.component';
import { LoginComponent } from './main/pages/login/login.component';
import { MainWrapperComponent } from './main/components/main-wrapper/main-wrapper.component';
import { TrucksComponent } from './main/pages/trucks/trucks.component';
import { AddTruckComponent } from './main/pages/add-truck/add-truck.component';
import { AuthGuard } from './services/auth-guard.service';
import { CustomersComponent } from './main/pages/customers/customers.component';
import { AddCustomerComponent } from './main/pages/add-customer/add-customer.component';
import { DepartmentsComponent } from './main/pages/departments/departments.component';
import { AddDepartmentComponent } from './main/pages/add-department/add-department.component';
import { EmployeesComponent } from './main/pages/employees/employees.component';
import { AddEmployeeComponent } from './main/pages/add-employee/add-employee.component';
import { AddRentalComponent } from './main/pages/add-rental/add-rental.component';
import { RentalsComponent } from './main/pages/rentals/rentals.component';
import { AddMaintenanceComponent } from './main/pages/add-maintenance/add-maintenance.component';
import { MaintenancesComponent } from './main/pages/maintenances/maintenances.component';
import { InvoicesComponent } from './main/pages/invoices/invoices.component';
import { DepartmentComponent } from './main/pages/department/department.component';

const routes: Routes = [
  {
    path: '',
    component: MainWrapperComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'trucks',
        component: TrucksComponent,
      },
      {
        path: 'add-truck',
        component: AddTruckComponent,
      },
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'add-customer',
        component: AddCustomerComponent,
      },
      {
        path: 'departments',
        component: DepartmentsComponent,
      },
      {
        path: 'add-department',
        component: AddDepartmentComponent,
      },
      {
        path: 'employees',
        component: EmployeesComponent,
      },
      {
        path: 'add-employee',
        component: AddEmployeeComponent,
      },
      {
        path: 'add-rental',
        component: AddRentalComponent,
      },
      {
        path: 'rentals',
        component: RentalsComponent,
      },
      {
        path: 'add-maintenance',
        component: AddMaintenanceComponent,
      },
      {
        path: 'maintenances',
        component: MaintenancesComponent,
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
      },
      {
        path: 'department/:id',
        component: DepartmentComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
