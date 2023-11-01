import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './main/pages/login/login.component';
import { RegisterComponent } from './main/pages/register/register.component';
import { DashboardComponent } from './main/pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    ToastrModule.forRoot({
      closeButton: true,
    }),
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
