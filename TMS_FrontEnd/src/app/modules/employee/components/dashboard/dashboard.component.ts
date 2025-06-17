import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

listOfTasks:any=[];

selectedTask: any = null;
selectedStatus: string = '';
statusOptions: string[] = ['INPROGRESS', 'COMPLETED', 'PENDING'];
alertType: string='';
alertMessage: string='';

  constructor(private employeeService:EmployeeService){
    this.getEmployeeTasks(); 
  }

  openModal(task: any): void {
  this.selectedTask = task;
  this.selectedStatus = task.taskStatus; // optional: prefill current
}

  closeModal(): void {
  this.selectedTask = null;
  this.selectedStatus = '';
}

  submitStatusUpdate() {
  if (!this.selectedStatus || !this.selectedTask) return;

  this.employeeService.updateTaskStatus(this.selectedTask.id, this.selectedStatus).subscribe({
    next: () => {
      this.alertType = 'success';
      this.alertMessage = 'Task status updated successfully';
      this.getEmployeeTasks();
      this.closeModal();

      setTimeout(() => {
          this.alertMessage = '';
          this.alertType = '';
          }, 3000);
    },
    error: (err) => {
      console.log(err);
      this.alertType = 'error';
      this.alertMessage = 'Failed to update status';
      this.closeModal();

      setTimeout(() => {
          this.alertMessage = '';
          this.alertType = '';
          }, 3000);
    }
  });
}


  getEmployeeTasks(){

    this.employeeService.getEmployeeTasks().subscribe({
      next:(res)=>{

        this.listOfTasks=res;
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

}
