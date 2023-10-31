import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './main/pages/dashboard/dashboard.component';
import { LoginComponent } from './main/pages/login/login.component';
import { MainWrapperComponent } from './main/components/main-wrapper/main-wrapper.component';
import { TrucksComponent } from './main/pages/trucks/trucks.component';

const routes: Routes = [
  {
    path: "",
    component: MainWrapperComponent,
    children: [
      {
        path: "",
        component: DashboardComponent
      },
      {
        path: "trucks",
        component: TrucksComponent
      }
    ]
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
