import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AdminService } from '../admin.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardResolverService implements Resolve<any>{

  constructor(private adminService:AdminService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {

    return this.adminService.getAllTasks();
    
  }
}
