import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastComponent } from '../shared/toast/toast.component';
import { Product } from '../shared/models/product.model';
import { AddCartService } from '../services/add-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: string[];
  product: Product;
  
  constructor(private http: HttpClient, public toast: ToastComponent, private cartService: AddCartService) { }

  ngOnInit(): void {
    this.http.get('http://localhost:4200/api/products')
      .subscribe(data => {
        this.products = data as string[];
      });
}

addToCart(product) {
  this.cartService.addToCart(product);
  window.alert('Your product has been added to the cart!');
}



}