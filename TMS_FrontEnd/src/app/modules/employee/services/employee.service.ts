import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Observable } from 'rxjs';

const BASE_URL="http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  //Create authorization header method
  private createAuthorizationHeader(): HttpHeaders{

    return new HttpHeaders().set('Authorization','Bearer '+StorageService.getToken())

  }

  //Get all task method
  getEmployeeTasks(): Observable<any>{
  
      return this.http.get(BASE_URL + "api/employee/employeeTasks",{
        headers:this.createAuthorizationHeader()
      })
  
  }

  //Update TaskStatus Method
   updateTaskStatus(taskId: number, newStatus: string): Observable<any> {

    console.log("Reached till service method");

     return this.http.get(BASE_URL + `api/employee/updateStatus/${taskId}/${newStatus}`,{
        headers:this.createAuthorizationHeader()
      })
  }


  //Get Task By Id Method
    getTaskById(id:number): Observable<any>{
  
      return this.http.get(BASE_URL + "api/employee/getTask/"+id, {
        headers:this.createAuthorizationHeader()
      })
  
    }
  
  
    //Public Comment API
    publishComment(id:number,content:string): Observable<any>{
  
      const params={
        content:content
      }
      return this.http.post(BASE_URL + "api/employee/comment/"+id,null,{
        headers:this.createAuthorizationHeader(),
        params:params,
      })
  
    }
  
    //get All Comments By Task Method
    getCommentsByTask(id:number): Observable<any>{
  
      return this.http.get(BASE_URL + "api/employee/getAllComments/"+id, {
        headers:this.createAuthorizationHeader()
      })
  
    }
}
