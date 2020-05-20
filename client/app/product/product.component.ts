import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { ProductService } from '../services/product.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product = new Product();
  products: Product[] = [];
  isLoading = true;
  isEditing = false;
  
  ProductForm: FormGroup;
  Productname = new FormControl('', Validators.required);
  Productdesc = new FormControl('', Validators.required);
  Price = new FormControl('', Validators.required);
  Brand = new FormControl('', Validators.required);
  Barcode = new FormControl('', Validators.required);
  Image = new FormControl('', Validators.required);

  constructor(private productService: ProductService,public toast: ToastComponent, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ProductForm = this.formBuilder.group({
      Productname: this.Productname,
      Productdesc: this.Productdesc,
      Price: this.Price,
      Brand: this.Brand,
      Barcode: this.Barcode,
      Image: this.Image
    });
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      data => this.products = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addProduct() {
    this.productService.addProduct(this.ProductForm.value).subscribe(
      res => {
        this.products.push(res);
        this.ProductForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(product: Product) {
    this.isEditing = true;
    this.product = product;
  }

  cancelEditing() {
    this.isEditing = false;
    this.product = new Product();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getProducts();
  }

  editProduct(product: Product) {
    this.productService.editProduct(product).subscribe(
      () => {
        this.isEditing = false;
        this.product = product;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteProduct(product: Product) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.productService.deleteProduct(product).subscribe(
        () => {
          this.products = this.products.filter(elem => elem._id !== product._id);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }
}
