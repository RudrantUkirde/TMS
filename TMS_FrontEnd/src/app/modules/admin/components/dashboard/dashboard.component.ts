import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  alertMessage: string = '';
  alertType: 'success' | 'error' | '' = '';


  listOfTasks:any[]=[];
  searchForm !: FormGroup;

  constructor(private service:AdminService,private router:Router,private fb:FormBuilder,private route:ActivatedRoute){

    this.searchForm=this.fb.group({
      title:[null]
    })

  }

  ngOnInit(): void {
  
    // this.getAllTasks();
    this.listOfTasks=this.route.snapshot.data['taskList'];
  } 


    //Get ALL Task Method
    getAllTasks(){

      this.service.getAllTasks().subscribe({
        next:(res)=>{

          this.listOfTasks=res;
          console.log(this.listOfTasks);

        },
        error:(err)=>{

          console.log(err);
        }
      })

    }

    //Delete Task Method
    deleteTask(id: number) {

      this.service.deleteTask(id).subscribe({
        next:(res)=>{

          this.alertType='success';
          this.alertMessage="Task Deleted Successful!";
          this.getAllTasks();

          setTimeout(() => {
            this.alertMessage = '';
            this.alertType = '';
            }, 4000);

        },
        error:(err)=>{

          this.alertType = 'error';
          this.alertMessage = 'Something went wrong!!';

          console.log(err);

          setTimeout(() => {
            this.alertMessage = '';
            this.alertType = '';
            }, 4000);

        }
      })
    }


    //Search task Method
    searchByTitle(){

      this.listOfTasks=[];
      const title=this.searchForm.get('title')?.value;

      if(!title){
        this.getAllTasks();  // Reset list if search box is cleared
        return;
      }

      this.service.searchTaskByTitle(title).subscribe({

        next: (res) => {
          console.log(res);
          this.listOfTasks = res;

          if(this.listOfTasks.length === 0){
            this.alertType = 'error';
            this.alertMessage = 'No Task present with this title';
            setTimeout(() => (this.alertMessage = ''), 2000);
          }else{
            this.alertMessage='';
          }
        },
        error: (err) => {
          console.error(err);
          this.alertType = 'error';
          this.alertMessage = 'Task not found!';
          setTimeout(() => (this.alertMessage = ''), 3000);
        }
      });
    }

}
