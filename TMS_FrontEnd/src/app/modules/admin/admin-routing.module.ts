import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostTaskComponent } from './components/post-task/post-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { ViewTaskDetailComponent } from './components/view-task-detail/view-task-detail.component';

const routes: Routes = [

  {path:"dashboard",component:DashboardComponent},
  {path:"task", component:PostTaskComponent},
  {path:"updateTask/:id", component:UpdateTaskComponent},
  {path:"viewTaskDetails/:id",component:ViewTaskDetailComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
