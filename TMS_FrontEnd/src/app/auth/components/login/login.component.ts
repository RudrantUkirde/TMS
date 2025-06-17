import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm !: FormGroup;
  hidePassword=true;

  alertMessage: string = '';
  alertType: 'success' | 'error' | '' = '';

  constructor(private fb: FormBuilder,private authService:AuthService,private router: Router){

    this.loginForm= this.fb.group({

      email:[null,[Validators.email,Validators.required]],
      password:[null,[Validators.required,Validators.minLength]],
       
    })

  }

  togglePasswordVisibility(){

    this.hidePassword = !this.hidePassword;
  }


  //Login Method
  onSubmit(){

    if (this.loginForm.invalid) {
      this.alertType = 'error';
      this.alertMessage = 'Please fill in the form correctly.';
      return;
    }

    const payload = this.loginForm.value;

    this.authService.login(payload).subscribe({
      next:(res) =>{

        if(res.userId != null){

          const user={
            id:res.userId,
            role:res.userRole
          }

          StorageService.saveUser(user);
          StorageService.saveToken(res.jwt);

          if(StorageService.isAdminLoggedIn()){
            this.router.navigateByUrl("/admin/dashboard");
          }else if(StorageService.isEmployeeLoggedIn()){
            this.router.navigateByUrl("/employee/dashboard");
          }

          // this.alertType='success';
          // this.alertMessage="Signup successful!";

          // this.router.navigateByUrl("/login");

          // setTimeout(() => {
          // this.loginForm.reset();
          // this.alertMessage = '';
          // this.alertType = '';
          // }, 3000);

        }    

      },
      error:(err) =>{

        this.alertType = 'error';
        if (err.status === 401) {
          this.alertMessage = 'Invalid email or password.';
        }else if(err.status === 403){
          this.alertMessage = 'Email does not exist,Register to login';
        } else {
          this.alertMessage = 'Something went wrong. Please try again.';
        }

      }
    });

  }

}
