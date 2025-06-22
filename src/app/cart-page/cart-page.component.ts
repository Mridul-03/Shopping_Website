import { Component, Input, NgModule } from '@angular/core';
import { SmartPhone } from '../SmartPhone_Description';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { map } from 'rxjs';
import { CartItemsService } from '../cart-items.service';
import { Product_Information, total_amount, total_quantities } from '../models/product';
import { LoginService } from '../login.service';
import { HeaderComponent } from '../header/header.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterOutlet, HeaderComponent , ToastrModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {

  items: Product_Information[];
  Total_cost: number = 0;
  Username: string;
  total_Quantities: number;

  constructor(private cartItem: CartItemsService, private login: LoginService, private route: Router , private toastr : ToastrService) {

    this.cartItem.setRecentUpdatedToZero();
    this.login.getCurrentUser().subscribe((result : any)=>{
      if(result && result.body && result.body.length == 0)
      {
        this.route.navigate(['Login']);
      }
      else{
         
        this.cartItem.getCartItems().subscribe((result) => {
          this.items = result;
          this.login.getCurrentUser().subscribe((result) => {
            this.Username = result.body[0]['Username'];
            this.Username = this.Username.toUpperCase();
            this.cartItem.getTotalCost().subscribe((result) => {
              console.log(result);
              this.Total_cost = result.body[0]['total_amount'];
              this.cartItem.getCartQuantities().subscribe((result: any) => {
                this.total_Quantities = result.body[0]['totalQuantities'];
              })
            })
          })
    
        })
      }
    })

  }

  removeItem(id: number) {
    let count = -1;
    for (let item of this.items) {
      count++;
      if (item.id == id) {
        if (item.Quantity > 1) {
          item.Quantity--;
          item.total = item.Price * item.Quantity;
          this.Total_cost = this.Total_cost - item.Price;
          break;
        }
        else {
          this.toastr.error(`${item.brand} ${item.model} has been removed from the cart`);
          this.items.splice(count, 1);
          this.Total_cost = this.Total_cost - item.Price;
          break;
        }
      }
    }

    this.cartItem.isItemPresent(id).subscribe((result) => {

      const obj: Product_Information = result.body[0];
      if (obj.Quantity > 1) {
        obj.Quantity--;
        obj.total = obj.Price * obj.Quantity;
        this.cartItem.updateItem(obj, id).subscribe((result) => {

          this.cartItem.getTotalCost().subscribe((result) => {
            const amount: total_amount = result.body[0];
            amount.total_amount = amount.total_amount - obj.Price;

            this.cartItem.updateTotalCost(amount).subscribe((result) => {

              this.cartItem.getCartQuantities().subscribe((result) => {

                const obj: total_quantities = result.body[0];
                obj.totalQuantities = obj.totalQuantities - 1;

                this.cartItem.updateCartQuantities(obj).subscribe((result) => {
                  this.cartItem.removeRecentAddedQuantities();
                })
              })
            })
          })

        });
      }
      else {
        this.cartItem.deleteItem(id, obj.Price).subscribe((result) => {

          this.cartItem.getTotalCost().subscribe((result) => {
            const amount: total_amount = result.body[0];
            amount.total_amount = amount.total_amount - obj.Price;

            this.cartItem.updateTotalCost(amount).subscribe((result) => {

              this.cartItem.getCartQuantities().subscribe((result) => {

                const obj: total_quantities = result.body[0];
                obj.totalQuantities = obj.totalQuantities - 1;

                this.cartItem.updateCartQuantities(obj).subscribe((result) => {
                  this.cartItem.removeRecentAddedQuantities();
                })
              })

            })
          })
        });
      }

    })

  }

  addItem(id: number) {
    for (let item of this.items) {
      if (item.id == id) {
        item.Quantity++;
        item.total = item.Price * item.Quantity;
        this.Total_cost = this.Total_cost + item.Price;
        break;
      }
    }
    this.cartItem.isItemPresent(id).subscribe((result) => {

      const obj: Product_Information = result.body[0];
      obj.Quantity = obj.Quantity + 1;
      obj.total = obj.Price * obj.Quantity;

      this.cartItem.updateItem(obj, id).subscribe((result) => {
        console.log(result);
        this.cartItem.getTotalCost().subscribe((result) => {
          console.log(result);

          const amount: total_amount = result.body[0];
          amount.total_amount = amount.total_amount + obj.Price;

          this.cartItem.updateTotalCost(amount).subscribe((result) => {
            console.log(result);
            this.cartItem.getCartQuantities().subscribe((result) => {
              const obj: total_quantities = result.body[0];
              obj.totalQuantities = obj.totalQuantities + 1;

              this.cartItem.updateCartQuantities(obj).subscribe((result) => {
                this.cartItem.addRecentAddedQuantities();
              })
            })
          })
        })
      });

    })
  }

  onClick() {
    this.route.navigate(['']);
  }

  shopClick() {
    this.route.navigate(['productListing'])
  }


}
