import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule, RouterOutlet , Router } from '@angular/router';
import { Product, Product_Information, total_amount, total_quantities } from '../models/product';
import { GetProductService } from '../get-product.service';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartItemsService } from '../cart-items.service';
import { LoginService } from '../login.service';
import { HeaderComponent } from '../header/header.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [RouterOutlet , RouterModule , CommonModule , HeaderComponent , ToastrModule],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css'
})
export class ProductDetailPageComponent {

  id : number;
  product : Product;
  isDataRetrieved : boolean = false;
  Username : string;


  constructor(private route : ActivatedRoute , private gettingProduct : GetProductService , private cartItem : CartItemsService , private login : LoginService , private route1 : Router , private toastr : ToastrService){
    
    this.cartItem.setRecentUpdatedToZero();
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.gettingProduct.getProduct(this.id).subscribe((result)=>{
        this.product = result[0];
        this.product.price = this.product.price*80;
        this.isDataRetrieved = true;

        this.login.getCurrentUser().subscribe((result : any)=>{
          if(result && result.body && result.body.length == 0)
          {
             this.route1.navigate(['Login']);
          }
        })

      })

    })
  }

  onCart()
 {
    let id2 = this.id-1;
    this.toastr.success(`${this.product.brand} ${this.product.model} added to cart`);
    this.cartItem.isItemPresent(this.id).subscribe((result : any)=>{


       if(result && result.body && result.body.length == 0)
       {
         const obj : Product_Information = {
         
          id : this.product.id,
          brand : this.product.brand,
          model : this.product.model,
          ram : this.product.ram,
          color : this.product.color,
          storage : this.product.storage,
          Quantity : 1,
          Price : this.product.price,
          img : this.product.img,
          total : this.product.price

         }

         this.cartItem.addItem(obj).subscribe((result)=>{
          this.cartItem.getTotalCost().subscribe((result)=>{

            const amount : total_amount = result.body[0];
            amount.total_amount = amount.total_amount + this.product.price;
    
            this.cartItem.updateTotalCost(amount).subscribe((result)=>{

             this.cartItem.getCartQuantities().subscribe((result)=>{

              const obj : total_quantities = result.body[0];
              obj.totalQuantities = obj.totalQuantities + 1;

              this.cartItem.updateCartQuantities(obj).subscribe((result)=>{
                this.cartItem.addRecentAddedQuantities();
              })

             });

            })
          })
         });
       }
       else
       {
          this.cartItem.isItemPresent(this.id).subscribe((result)=>{
          const obj : Product_Information = result.body[0];
          console.log(obj);
          obj.Quantity = obj.Quantity + 1; 
          obj.total = this.product.price*obj.Quantity;
          this.cartItem.updateItem(obj , this.id).subscribe((result)=>{
            console.log(result);
            this.cartItem.getTotalCost().subscribe((result)=>{

              const amount : total_amount = result.body[0];
              amount.total_amount = amount.total_amount + this.product.price;
      
              this.cartItem.updateTotalCost(amount).subscribe((result)=>{

                this.cartItem.getCartQuantities().subscribe((result)=>{

                  const obj : total_quantities = result.body[0];
                  obj.totalQuantities = obj.totalQuantities + 1;
    
                  this.cartItem.updateCartQuantities(obj).subscribe((result)=>{
                    this.cartItem.addRecentAddedQuantities();
                  })
    
                 });

              })
            })
          });
          });
             
       }
    });
 }

 onClick()
 {
   this.route1.navigate(['']);
 }


}
