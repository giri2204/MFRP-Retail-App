import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/models/product.model';
import { ToastComponent } from '../shared/toast/toast.component';
import { ProductService } from '../services/product.service';
import { AddCartService } from '../services/add-cart.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {
productid: any;
products: Product[];
 product:Product; 
 isEditing = false;
 isLoading = true;

  constructor(private route: ActivatedRoute, private cartService: AddCartService,
    private productService: ProductService, public toast: ToastComponent) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
        const id = this.route.snapshot.params.id;
        for(let i = 0; i < this.products.length; i++){
          if(id === this.products[i]._id){
            this.product = this.products[i];
          }
        }
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addToCart(product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

}


