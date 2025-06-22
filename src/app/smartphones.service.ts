import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class SmartphonesService {

  constructor(private http: HttpClient) { }

  getSmartphones() {
    return this.http.get<Product[]>('http://localhost:3000/smartphones');
  }

}
