import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { environment } from '../../../../environments/environment';


const BASE_URL=environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient){}


  //Get Users method
  getUsers(): Observable<any>{

    return this.http.get(BASE_URL + "api/admin/users",{
      headers:this.createAuthorizationHeader()
    })

  }

  //Post Task Method
  postTask(taskDto:any): Observable<any>{

    return this.http.post(BASE_URL + "api/admin/createTask", taskDto , {
      headers:this.createAuthorizationHeader()
    })

  }

  //Delete Task Method
  deleteTask(id:number): Observable<any>{

    return this.http.delete(BASE_URL + "api/admin/deleteTask/"+id, {
      headers:this.createAuthorizationHeader()
    })

  }

  //Get all task method
  getAllTasks(): Observable<any>{

    return this.http.get(BASE_URL + "api/admin/getAllTasks",{
      headers:this.createAuthorizationHeader()
    })

  }

  //Update Task Method
  updateTask(id:number,taskDto:any): Observable<any>{

    return this.http.put(BASE_URL + `api/admin/updateTask/${id}`, taskDto , {
      headers:this.createAuthorizationHeader()
    })

  }

  //Search Task By Title
  searchTaskByTitle(title:String):Observable<any>{

    return this.http.get(BASE_URL+`api/admin/searchTask/${title}`,{
      headers:this.createAuthorizationHeader()
    })
  }

  //Get Task By Id Method
  getTaskById(id:number): Observable<any>{

    return this.http.get(BASE_URL + "api/admin/getTask/"+id, {
      headers:this.createAuthorizationHeader()
    })

  }


  //Public Comment API
  publishComment(id:number,content:string): Observable<any>{

    const params={
      content:content
    }
    return this.http.post(BASE_URL + "api/admin/comment/"+id,null,{
      headers:this.createAuthorizationHeader(),
      params:params,
    })

  }

  //get All Comments By Task Method
  getCommentsByTask(id:number): Observable<any>{

    return this.http.get(BASE_URL + "api/admin/getAllComments/"+id, {
      headers:this.createAuthorizationHeader()
    })

  }



  //Create authorization header method
  private createAuthorizationHeader(): HttpHeaders{

    return new HttpHeaders().set('Authorization','Bearer '+StorageService.getToken())

  }



  
}
