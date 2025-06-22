import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import {Router, RouterModule, RouterOutlet} from '@angular/router'
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { CartItemsService } from '../cart-items.service';
import { CurrentUser } from '../models/product';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule , RouterModule , RouterOutlet , FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  Username : string;
  totalProducts : number;

  constructor(private login : LoginService , private route : Router , private cart : CartItemsService){
  
    this.login.getCurrentUser().subscribe((result)=>{
      this.Username = result.body[0]['Username'];
      this.Username = this.Username.toUpperCase();
      
      this.cart.getCartQuantities().subscribe((result)=>{
        this.cart.getRecentAddedQuantities().subscribe((result1)=>{
          this.totalProducts = result.body[0]['totalQuantities'] + result1
        })
      })

    })

  }

  onClick()
  {
    this.login.getCurrentUser().subscribe((result)=>{
      const obj : string = result.body[0]['id'];
      this.login.deleteCurrentUser(obj).subscribe((result)=>{
        this.route.navigate(['Login']);
      })
      
    })
    
  }

}
