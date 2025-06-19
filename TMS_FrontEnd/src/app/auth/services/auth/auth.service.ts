import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const BASE_URL= environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }


  //signup service method
  signup(signupRequest:any):Observable<any>{

    return this.http.post(BASE_URL + "api/auth/signup",signupRequest);

  }


  //login service method
  login(loginRequest:any):Observable<any>{

    return this.http.post(BASE_URL + "api/auth/login",loginRequest);

  }
}
