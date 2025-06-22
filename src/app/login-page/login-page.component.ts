import { CommonModule, CurrencyPipe, NgFor } from '@angular/common';
import { Component, NgModule, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from '../login.service';
import { userInformation } from '../sign-up-page/user_information';
import { LoginUser } from '../LoggedInUser';
// import { GetNameService } from '../get-name.service';
import { CurrentUser } from '../models/product';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterOutlet],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  @ViewChild('f') LoginForm: NgForm;
  constructor(private login: LoginService, private route: Router) { 
   
    this.login.getCurrentUser().subscribe((result : any)=>{
      if(result && result.body && result.body.length != 0)
      {
         this.login.deleteCurrentUser(result.body[0]['id']).subscribe((result)=>{});
      }
    })

  }

  b1 = true;

  onSubmit(data: any) {
    const UserInfo: LoginUser = {
      email: data.controls.email.value,
      password: data.controls.password.value
    };

    this.login.UserLogin(UserInfo).subscribe((result : any)=>{
      console.log(result);
      if(result && result.body && result.body.length == 0)
      {
        this.b1 = false;
      }
      else
      {
        const User : CurrentUser = {
          Username : result.body[0]['Username']
        }
        if(data.controls.password.value == result.body[0]['password'])
        {
          this.login.getCurrentUser().subscribe((result : any)=>{
          
            console.log(result);
            if(result && result.body && result.body.length == 0)
            {
              this.login.setCurrentUser(User).subscribe((result)=>{});
              // this.login.setFlag();
              this.route.navigate(['productListing']);

            }
            else
            {
              console.log(result);
              this.login.deleteCurrentUser(result.body[0]['id']).subscribe((result)=>{
                // console.log("hello");
                this.login.setCurrentUser(User).subscribe((result)=>{
                  // this.login.setFlag();
                  this.route.navigate(['productListing']);
                });
              })
            }

          })
        }
        else
        {
          this.b1 = false;
        }
      }
     });;

  }



}
