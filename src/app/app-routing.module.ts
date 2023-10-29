import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './main/pages/dashboard/dashboard.component';
import { LoginComponent } from './main/pages/login/login.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent
  },
  {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
