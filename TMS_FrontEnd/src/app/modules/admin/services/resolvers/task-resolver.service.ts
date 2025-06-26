import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../admin.service';

@Injectable({
  providedIn: 'root'
})
export class TaskResolverService implements Resolve<any>{

  constructor(private adminService:AdminService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    const taskId= +route.paramMap.get('id')!;
    return this.adminService.getTaskById(taskId);
    
  }
}
