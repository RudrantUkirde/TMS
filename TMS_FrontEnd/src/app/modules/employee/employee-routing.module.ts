import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewTaskDetailComponent } from './components/view-task-detail/view-task-detail.component';

const routes: Routes = [ 

  {path:"dashboard",component:DashboardComponent},
  {path:"viewTaskDetails/:id",component:ViewTaskDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
