import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm !: FormGroup;
  hidePassword=true;
  hideConfirmPassword=true;

  alertMessage: string = '';
  alertType: 'success' | 'error' | '' = '';

  constructor(private fb: FormBuilder, private authService:AuthService,private router: Router){

    this.signupForm= this.fb.group({

      name:[null,[Validators.required]],
      email:[null,[Validators.email,Validators.required]],
      password:[null,[Validators.required,Validators.minLength]],
      confirmPassword:[null,[Validators.minLength,Validators.required]],
       
    })

  }


  //Hide password method
  togglePasswordVisibility(){

    this.hidePassword = !this.hidePassword;
  }


  //hide confirm password method
  toggleConfirmPasswordVisibility(){

    this.hideConfirmPassword = !this.hideConfirmPassword;
  }


  //Submit method
  onSubmit(){


    if(this.signupForm.invalid){
      this.alertType='error';
      this.alertMessage='Please fill in the form correctly.';
      this.signupForm.markAllAsTouched();
      return;
    }

    const password = this.signupForm.get("password")?.value;
    const confirmpPassword = this.signupForm.get("confirmPassword")?.value;
    const payload = this.signupForm.value;

    if(password !== confirmpPassword){ 

      this.alertType = 'error';
      this.alertMessage = 'Password mis-match';

      setTimeout(() => {
          this.alertMessage = '';
          this.alertType = '';
          }, 3000);

      return;
    }

    this.authService.signup(payload).subscribe({

      next:(res) =>{

        console.log(res);

        if(res.id != null){

          this.alertType='success';
          this.alertMessage="Signup successful!";

          this.router.navigateByUrl("/signup");

          setTimeout(() => {
          this.signupForm.reset();
          this.alertMessage = '';
          this.alertType = '';
          }, 4000);

        }

      },
      error:(err) =>{

        console.log(err);

        this.alertType = 'error';
        if (err.status === 406) {
          this.alertMessage = 'Email already registered, please Login!!';
        } else {
          this.alertMessage = 'Something went wrong. Please try again.';
        }
      }
    });


  }


}
