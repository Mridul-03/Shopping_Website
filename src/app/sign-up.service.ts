import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { resolve } from 'path';
import { CurrentUser } from './models/product';


@Injectable({
  providedIn: 'root'
})

export class SignUpService {

  constructor(private http: HttpClient, private route: Router) { }

  private flag: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  UserSignUp(data: any) {
    return this.http.get(`http://localhost:3000/User_Information?email=${data.email}`, { observe: 'response' });
  }

  UserSigningUp(data : any)
  {
    return this.http.post('http://localhost:3000/User_Information' , data);
  }

  getUserByEmail(email: string) {
    return this.http.get(`http://localhost:3000/User_Information?email=${email}`);
  }

  getCurrentUser()
  {
    return this.http.get('http://localhost:3000/Current_User' , {observe : 'response'});
  }

  deleteCurrentUser(id : number)
  {
   return this.http.delete(`http://localhost:3000/Current_User/${id}`);
  }

  setCurrentUser(Username : CurrentUser)
  {
   return this.http.post('http://localhost:3000/Current_User' , Username);
  }


}
