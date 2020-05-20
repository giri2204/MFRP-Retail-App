import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddCartService {
  products = [];
  constructor(private http: HttpClient) { }

  addToCart(product) {
    this.products.push(product);
  }

  getItems() {
    return this.products;
  }
  
  getShippingPrices() {
    return this.http.get('/assets/payment.json');
  }

  /*clearCart() {
    this.products = [];
    return this.products;
  }*/
}
