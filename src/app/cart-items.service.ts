import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product_Information, total_amount, total_quantities } from './models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  constructor(private http : HttpClient) {}

  private total_cost : BehaviorSubject<number> = new BehaviorSubject(0);
  private total_CartItems : BehaviorSubject<number> = new BehaviorSubject(0);

  isItemPresent(id : number)
  {
    return this.http.get(`http://localhost:3000/cartItems?id=${id}` , {observe : 'response'});
  }

  addItem(data : Product_Information)
  {
    // console.log("hello");
    console.log(data);
    const a = this.total_cost.value;
    this.total_cost.next(a + data.Price);
    return this.http.post('http://localhost:3000/cartItems' , data);
  }

  updateItem(data : Product_Information , id : number)
  {
    const a = this.total_cost.value;
    this.total_cost.next(a + data.Price);
    return this.http.put(`http://localhost:3000/cartItems/${id}` , data);
  }

  getCartItems()
  {
    return this.http.get<Product_Information[]>('http://localhost:3000/cartItems');
  }

  deleteItem(id : number , price : number)
  {
    const a = this.total_cost.value;
    this.total_cost.next(a - price);
     return this.http.delete(`http://localhost:3000/cartItems/${id}`);
  }

  getTotalCost()
  {
    return this.http.get(`http://localhost:3000/total_amount`,{observe : 'response'})
  }
  
  updateTotalCost(data : total_amount)
  {
    return this.http.put(`http://localhost:3000/total_amount/1` , data);
  } 

  getRecentAddedQuantities()
  {
    return this.total_CartItems.asObservable();
  }

  addRecentAddedQuantities()
  {
    // console.log("Hello");
    let a = this.total_CartItems.value;
    a++;
    this.total_CartItems.next(a);
  }

  removeRecentAddedQuantities()
  {
    let a = this.total_CartItems.value;
     a--;
     this.total_CartItems.next(a);
  }

  getCartQuantities()
  {
    return this.http.get('http://localhost:3000/total_quantities' , {observe : 'response'});
  }

  updateCartQuantities(data : total_quantities)
  {
    console.log(data);
    return this.http.put(`http://localhost:3000/total_quantities/1` , data);
  }

  setRecentUpdatedToZero()
  {
    this.total_CartItems.next(0);
  }

}
