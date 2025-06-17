import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-task-detail',
  standalone: false,
  templateUrl: './view-task-detail.component.html',
  styleUrl: './view-task-detail.component.css'
})
export class ViewTaskDetailComponent {

  taskId:number=0;
  taskData:any;
  commentForm!:FormGroup;
  comments:any;

  constructor(private service:AdminService,private activatedRoute:ActivatedRoute,private fb:FormBuilder){

    this.taskId=this.activatedRoute.snapshot.params["id"];
  }

  ngOnInit(){
    this.getTaskById();
    this.getAllComments();
    this.commentForm=this.fb.group({
      content:[null,Validators.required]
    })
    
  }

  getTaskById(){

    this.service.getTaskById(this.taskId).subscribe({
      next:(res)=>{
        this.taskData=res;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  publishComment(){
    this.service.publishComment(this.taskId,this.commentForm.get("content")?.value).subscribe({
      next:(res)=>{

        if(res.id != null){
          console.log(res);
          this.commentForm.reset();
          this.getAllComments();
        }

      },
      error:(err)=>{
        console.log(err);

      }
    })
  }

  getAllComments(){

    this.service.getCommentsByTask(this.taskId).subscribe({
      next:(res)=>{
        this.comments=res;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  

}
