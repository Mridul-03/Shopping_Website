import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProductService {

  constructor(private http : HttpClient) {}

  getProduct(id : number)
  { 
    return this.http.get<Product>(`http://localhost:3000/smartphones?id=${id}`);
  }

}
