import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'TMS';

  isEmployeeLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;

  showLogout: boolean = false;

  constructor(private router: Router){}


  openLogoutModal() {
  this.showLogout = true;
  }



  ngOnInit(){

    this.router.events.subscribe(event => {

      this.isEmployeeLoggedIn= StorageService.isEmployeeLoggedIn();
      this.isAdminLoggedIn=StorageService.isAdminLoggedIn();

    })
  }

  logout(){

    this.showLogout = false;
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }


}

