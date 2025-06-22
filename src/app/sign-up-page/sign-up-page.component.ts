import { CommonModule } from '@angular/common';
import { Component, Inject, Injectable, NgModule, ViewChild, inject } from '@angular/core';
import { Form, FormsModule, NgForm, NgModel } from '@angular/forms';
import { ROUTES, Router, RouterLink, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { SignUpService } from '../sign-up.service';
import { userInformation } from './user_information';
import { Console } from 'console';
import { Observable } from 'rxjs';
import { CurrentUser } from '../models/product';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterOutlet],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css',
  // providers : [SignUpService]
})

export class SignUpPageComponent {

  @ViewChild('f') SignUpForm: NgForm;

  constructor(private signUp: SignUpService, private route: Router , private login : LoginService) {

    this.login.getCurrentUser().subscribe((result : any)=>{
      if(result && result.body && result.body.length != 0)
      {
         this.login.deleteCurrentUser(result.body[0]['id']).subscribe((result)=>{});
      }
    })

  }

  b1: boolean = false;

  SignUp(data: any) {
    const obj: userInformation =
    {
      Username : data.controls.firstname.value,
      email: data.controls.email.value,
      password: data.controls.password.value
    };

    this.signUp.UserSignUp(obj).subscribe((result : any) => {
      if(result && result.body && result.body.length == 0)
        {
          this.signUp.UserSigningUp(obj).subscribe((result)=>{
            this.signUp.getCurrentUser().subscribe((result : any)=>{
             
              if(result && result.body && result.body.length == 0)
              {
                const User : CurrentUser = {
                  Username : obj.Username
                }
                this.signUp.setCurrentUser(User).subscribe((result)=>{
                  this.route.navigate(['productListing']);
                })
              }
              else
              {
                this.signUp.deleteCurrentUser(result.body[0]['id']).subscribe((result)=>{
                  const User : CurrentUser = {
                    Username : obj.Username
                  }
                  this.signUp.setCurrentUser(User).subscribe((result)=>{
                    this.route.navigate(['productListing']);
                  })
                })
              }

            })
          })
        }
        else{
          this.b1 = true;
        }
    })

  }


}
