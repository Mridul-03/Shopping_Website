import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router, Routes } from '@angular/router';
import { CurrentUser } from './models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private route: Router) {}

  UserLogin(data: any) {
    return this.http.get(`http://localhost:3000/User_Information?email=${data.email}` , {observe : "response"})
  }

 
  getCurrentUser()
  {
    return this.http.get('http://localhost:3000/Current_User' , {observe : 'response'});
  }

  deleteCurrentUser(id : string)
  {
   return this.http.delete(`http://localhost:3000/Current_User/${id}`);
  }

  setCurrentUser(Username : CurrentUser)
  {
    return this.http.post('http://localhost:3000/Current_User' , Username);
  }


}
