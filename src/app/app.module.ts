import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './main/pages/login/login.component';
import { RegisterComponent } from './main/pages/register/register.component';
import { DashboardComponent } from './main/pages/dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './main/components/navbar/navbar.component';
import { MainWrapperComponent } from './main/components/main-wrapper/main-wrapper.component';
import { SideMenuComponent } from './main/components/side-menu/side-menu.component';
import { TrucksComponent } from './main/pages/trucks/trucks.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddTruckComponent } from './main/pages/add-truck/add-truck.component';
import { AddCustomerComponent } from './main/pages/add-customer/add-customer.component';
import { CustomersComponent } from './main/pages/customers/customers.component';
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserService } from './services/user.service';
import { AuthIntercepterService } from './services/auth-intercepter.service';
import { DepartmentsComponent } from './main/pages/departments/departments.component';
import { AddDepartmentComponent } from './main/pages/add-department/add-department.component';
import { EmployeesComponent } from './main/pages/employees/employees.component';
import { AddEmployeeComponent } from './main/pages/add-employee/add-employee.component';
import { RentalsComponent } from './main/pages/rentals/rentals.component';
import { AddRentalComponent } from './main/pages/add-rental/add-rental.component';
import { MaintenancesComponent } from './main/pages/maintenances/maintenances.component';
import { AddMaintenanceComponent } from './main/pages/add-maintenance/add-maintenance.component';
import { InvoicesComponent } from './main/pages/invoices/invoices.component';
import { DepartmentComponent } from './main/pages/department/department.component';
import { EmployeeComponent } from './main/pages/employee/employee.component';
import { RentalComponent } from './main/pages/rental/rental.component';
import { TruckComponent } from './main/pages/truck/truck.component';
import { CustomerComponent } from './main/pages/customer/customer.component';
import { InvoiceComponent } from './main/pages/invoice/invoice.component';
import { LoginMfaComponent } from './main/pages/login-mfa/login-mfa.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    MainWrapperComponent,
    SideMenuComponent,
    TrucksComponent,
    AddTruckComponent,
    AddCustomerComponent,
    CustomersComponent,
    DepartmentsComponent,
    AddDepartmentComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    RentalsComponent,
    AddRentalComponent,
    MaintenancesComponent,
    AddMaintenanceComponent,
    InvoicesComponent,
    DepartmentComponent,
    EmployeeComponent,
    RentalComponent,
    TruckComponent,
    CustomerComponent,
    InvoiceComponent,
    LoginMfaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    NgChartsModule,
    NgApexchartsModule,
    ToastrModule.forRoot({
      closeButton: true,
    }),
    NgxMaskDirective,
    NgSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercepterService,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideEnvironmentNgxMask(),
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
