import { CommonModule, NgFor } from '@angular/common';
import { Component, NgModule, Output , EventEmitter} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { SmartphonesService } from '../smartphones.service';
import { Product, Product_Information, total_amount, total_quantities } from '../models/product';
// import { GetNameService } from '../get-name.service';
import { CartItemsService } from '../cart-items.service';
import { LoginService } from '../login.service';
import { HeaderComponent } from '../header/header.component';
import { LoginPageComponent } from "../login-page/login-page.component";
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-listing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterOutlet, HeaderComponent, LoginPageComponent , ToastrModule],
  templateUrl: './product-listing-page.component.html',
  styleUrl: './product-listing-page.component.css'
})
export class ProductListingPageComponent {

  name : string;
  arr : any;
  b1 : boolean;
  products : Product[];
  Username : string;
  showpopup : boolean;
   
  constructor(private smartphone_getter : SmartphonesService , private route : Router , private cartItem : CartItemsService , private login : LoginService , private toastr : ToastrService){

    this.cartItem.setRecentUpdatedToZero();
    this.smartphone_getter.getSmartphones().subscribe((result)=>{
      console.log(result);
      this.products = result;
      this.b1 = true;
     
      this.login.getCurrentUser().subscribe((result : any)=>{
        if(result && result.body && result.body.length == 0)
        {
           this.route.navigate(['Login']);
        }
      })

    })

  }


 onClick(id : number)
 {
   this.route.navigate(['productDetail',id]);
 }

 onCart(id1 : number)
 {
    this.toastr.success(`${this.products.at(id1-1).brand} ${this.products.at(id1-1).model} added to cart`);
    let id2 = id1-1;
    this.cartItem.isItemPresent(id1).subscribe((result : any)=>{
       if(result && result.body && result.body.length == 0)
       {
         const obj : Product_Information = {
         
          id : this.products.at(id2).id,
          brand : this.products.at(id2).brand,
          model : this.products.at(id2).model,
          ram : this.products.at(id2).ram,
          color : this.products.at(id2).color,
          storage : this.products.at(id2).storage,
          Quantity : 1,
          Price : this.products.at(id2).price*80,
          img : this.products.at(id2).img,
          total : this.products.at(id2).price*80
         }

         this.cartItem.getTotalCost().subscribe((result)=>{
    
          const amount : total_amount = result.body[0];
          let id2 = id1 - 1;
          amount.total_amount = amount.total_amount + this.products.at(id2).price*80;
      
          this.cartItem.updateTotalCost(amount).subscribe((result)=>{
            this.cartItem.addItem(obj).subscribe((result)=>{
              this.cartItem.getCartQuantities().subscribe((result)=>{
                console.log(result.body[0]);
                const obj : total_quantities = result.body[0];
                obj.totalQuantities = obj.totalQuantities + 1;
                this.cartItem.updateCartQuantities(obj).subscribe((result)=>{
                  console.log(result);
                  this.cartItem.addRecentAddedQuantities();
                });
              })
            });
          });
      
         })
       }
       else
       {
          this.cartItem.isItemPresent(id1).subscribe((result)=>{
          const obj : Product_Information = result.body[0];
          console.log(obj);
          obj.Quantity = obj.Quantity + 1; 
          obj.total = this.products.at(id2).price*obj.Quantity*80;
          this.cartItem.updateItem(obj , id1).subscribe((result)=>{
            console.log(result);
            this.cartItem.getTotalCost().subscribe((result)=>{
    
              const amount : total_amount = result.body[0];
              let id2 = id1 - 1;
              amount.total_amount = amount.total_amount + this.products.at(id2).price*80;
          
              this.cartItem.updateTotalCost(amount).subscribe((result)=>{ this.cartItem.getCartQuantities().subscribe((result)=>{
                const obj : total_quantities = result.body[0];
                obj.totalQuantities = obj.totalQuantities + 1;
                this.cartItem.updateCartQuantities(obj).subscribe((result)=>{
                  this.cartItem.addRecentAddedQuantities();
                });
              })});
          
             })
          });
          });
             
       }
    });
 }

 onLogOutClick()
 {
   this.route.navigate(['']);
 }

}



