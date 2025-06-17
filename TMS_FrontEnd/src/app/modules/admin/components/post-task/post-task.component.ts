import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-task',
  standalone: false,
  templateUrl: './post-task.component.html',
  styleUrl: './post-task.component.css'
})
export class PostTaskComponent {

  taskForm !: FormGroup;
  listOfEmployees:any=[];
  listOfPriorities:any=["LOW","MEDIUM","HIGH"];

 

  constructor(private adminService: AdminService,private fb:FormBuilder,private router:Router){
    this.getUsers();

    this.taskForm=this.fb.group({
      employeeId:[null,[Validators.required]],

      title:[null,[Validators.required]],

      description:[null,[Validators.required]],

      dueDate:[null,[Validators.required]],

      priority:[null,[Validators.required]],
      

    })
  }

  getUsers(){
    this.adminService.getUsers().subscribe({
      next:(res) =>{
        this.listOfEmployees=res;
        console.log(res);
      },
      error:(err) =>{

        console.log(err);
      }
    })
  }


  postTask() {

    console.log(this.taskForm.value)
    this.adminService.postTask(this.taskForm.value).subscribe({

      next:(res)=>{

        console.log(res);
        this.router.navigateByUrl("/admin/dashboard");

      },
      error:(err)=>{

        console.log(err);
        
      }
    })
  }

}
