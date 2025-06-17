import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-task',
  standalone: false,
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent {

  id:number=0;

  updateTaskForm !: FormGroup;
  listOfEmployees:any=[];
  listOfPriorities:any=["LOW","MEDIUM","HIGH"];
  listOfTaskStatus:any=["PENDING","INPROGRESS","COMPLETED","DEFERRED","CANCELLED"];


  constructor(private service:AdminService,private route:ActivatedRoute,private fb:FormBuilder,private router:Router){
    this.id=this.route.snapshot.params["id"];
    this.getTaskById();

    this.updateTaskForm=this.fb.group({
      employeeId:[null,[Validators.required]],

      title:[null,[Validators.required]],

      description:[null,[Validators.required]],

      dueDate:[null,[Validators.required]],

      priority:[null,[Validators.required]],

      taskStatus:[null,[Validators.required]],

      
    })

    this.getUsers();
  }

  getUsers(){
    this.service.getUsers().subscribe({
      next:(res) =>{
        this.listOfEmployees=res;
        console.log(res);
      },
      error:(err) =>{

        console.log(err);
      }
    })
  }

  getTaskById() {
    this.service.getTaskById(this.id).subscribe({
      next:(res)=>{

        this.updateTaskForm.patchValue(res);
        console.log(res);
      },
      error:(err)=>{

        console.log(err);
      }
    })

  }

  updateTask() {

    console.log(this.updateTaskForm.value)
    this.service.updateTask(this.id,this.updateTaskForm.value).subscribe({

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
